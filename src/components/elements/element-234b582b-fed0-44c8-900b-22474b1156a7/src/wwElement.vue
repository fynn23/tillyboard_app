<template>
    <div class="canvas-board" ref="boardRef">
        <div class="canvas-container" ref="canvasRef">
            <div 
                v-for="image in images" 
                :key="image.id"
                class="canvas-item"
                :style="getImageStyle(image)"
                @mousedown="startDrag($event, image)"
            >
                <img :src="image.url" :alt="image.id" />
            </div>
        </div>
        
        <div class="canvas-controls">
            <button @click="triggerFileInput" class="upload-btn">
                <span>Upload Image</span>
            </button>
            <button @click="zoomIn">+</button>
            <button @click="zoomOut">-</button>
            <button @click="resetView">Reset</button>
        </div>

        <input 
            type="file" 
            ref="fileInput"
            accept="image/*"
            style="display: none"
            @change="handleFileUpload"
        />
    </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import panzoom from 'panzoom';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        // Refs
        const boardRef = ref(null);
        const canvasRef = ref(null);
        const fileInput = ref(null);
        const panzoomInstance = ref(null);
        const isDragging = ref(false);
        const draggedImage = ref(null);
        const dragOffset = ref({ x: 0, y: 0 });

        // Computed
        const images = computed(() => props.content?.images || []);
        const minZoom = computed(() => props.content?.minZoom || 0.1);
        const maxZoom = computed(() => props.content?.maxZoom || 3);
        const currentZoom = computed(() => panzoomInstance.value?.getTransform()?.scale || 1);

        // Methods
        const getImageStyle = (image) => ({
            transform: `translate(${image?.x || 0}px, ${image?.y || 0}px)`,
            cursor: isDragging.value && draggedImage.value?.id === image.id ? 'grabbing' : 'grab'
        });

        const initPanzoom = () => {
            if (!canvasRef.value) return;
            
            panzoomInstance.value = panzoom(canvasRef.value, {
                minZoom: minZoom.value,
                maxZoom: maxZoom.value,
                bounds: true,
                boundsPadding: 0.1
            });

            panzoomInstance.value.on('zoom', (e) => {
                emit('trigger-event', {
                    name: 'zoomChanged',
                    event: { value: e.getTransform().scale }
                });
            });
        };

        const startDrag = (event, image) => {
            if (!image) return;

            isDragging.value = true;
            draggedImage.value = image;
            
            const rect = event.target.getBoundingClientRect();
            dragOffset.value = {
                x: event.clientX - (rect.left + (image.x || 0)),
                y: event.clientY - (rect.top + (image.y || 0))
            };

            // Disable panzoom during drag
            panzoomInstance.value?.pause();

            // Add global event listeners
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        };

        const onDrag = (event) => {
            if (!isDragging.value || !draggedImage.value) return;

            const newX = event.clientX - dragOffset.value.x;
            const newY = event.clientY - dragOffset.value.y;

            // Update image position
            const updatedImages = images.value.map(img => {
                if (img.id === draggedImage.value.id) {
                    return { ...img, x: newX, y: newY };
                }
                return img;
            });

            // Emit position change
            emit('trigger-event', {
                name: 'positionChanged',
                event: { 
                    value: { 
                        id: draggedImage.value.id, 
                        x: newX, 
                        y: newY 
                    } 
                }
            });
        };

        const stopDrag = () => {
            isDragging.value = false;
            draggedImage.value = null;
            
            // Re-enable panzoom
            panzoomInstance.value?.resume();

            // Remove global event listeners
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
        };

        const triggerFileInput = () => {
            fileInput.value?.click();
        };

        const handleFileUpload = async (event) => {
            const file = event.target?.files?.[0];
            if (!file) return;

            try {
                // Create object URL for immediate display
                const url = URL.createObjectURL(file);
                
                // Generate unique ID
                const id = `image-${Date.now()}`;

                // Create new image object
                const newImage = {
                    id,
                    url,
                    x: 0,
                    y: 0
                };

                // Emit image added event
                emit('trigger-event', {
                    name: 'imageAdded',
                    event: { value: newImage }
                });

                // Reset file input
                if (fileInput.value) {
                    fileInput.value.value = '';
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };

        const zoomIn = () => {
            panzoomInstance.value?.zoomIn();
        };

        const zoomOut = () => {
            panzoomInstance.value?.zoomOut();
        };

        const resetView = () => {
            panzoomInstance.value?.reset();
            emit('trigger-event', {
                name: 'zoomChanged',
                event: { value: 1 }
            });
        };

        // Lifecycle hooks
        onMounted(() => {
            initPanzoom();
        });

        onBeforeUnmount(() => {
            if (panzoomInstance.value) {
                panzoomInstance.value.dispose();
            }
        });

        return {
            boardRef,
            canvasRef,
            fileInput,
            images,
            getImageStyle,
            startDrag,
            triggerFileInput,
            handleFileUpload,
            zoomIn,
            zoomOut,
            resetView
        };
    }
};
</script>

<style lang="scss" scoped>
.canvas-board {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f5f5f5;
}

.canvas-container {
    position: relative;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
}

.canvas-item {
    position: absolute;
    
    img {
        min-width: 200px;      /* Minimum width */
        min-height: 150px;     /* Minimum height */
        width: 300px;          /* Standard width */
        height: auto;          /* Maintain aspect ratio */
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 4px;
        background: white;     /* For transparent images */
    }
}

.canvas-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    z-index: 1000;
    padding: 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);

    button {
        height: 40px;
        border-radius: 20px;
        border: none;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        font-size: 16px;
        transition: all 0.2s ease;

        &.upload-btn {
            background: #007bff;
            color: white;
            padding: 0 24px;
            font-weight: 500;
        }

        &:not(.upload-btn) {
            width: 40px;
            padding: 0;
            border-radius: 50%;
        }

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        &:active {
            transform: translateY(0);
        }
    }
}
</style>