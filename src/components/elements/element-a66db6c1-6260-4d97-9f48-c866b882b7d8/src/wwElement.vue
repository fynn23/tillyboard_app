<template>
<div 
class="interactive-canvas" 
:style="canvasStyle"
@dragover.prevent="onDragOver"
@drop.prevent="onDrop"
@click="onCanvasClick"
ref="canvasRef"
>
<!-- Grid lines -->
<div v-if="content.showGrid" class="grid-lines">
<div v-for="i in gridLinesCount.x" :key="`x-${i}`" class="grid-line vertical" :style="{left: `${i * content.gridSize}px`}"></div>
<div v-for="i in gridLinesCount.y" :key="`y-${i}`" class="grid-line horizontal" :style="{top: `${i * content.gridSize}px`}"></div>
</div>

<!-- Upload zone when empty -->
<div 
v-if="!canvasItems.length" 
class="upload-zone"
:class="{ 'drag-over': isDraggingOver }"
>
<div class="upload-content">
<div class="upload-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
<polyline points="17 8 12 3 7 8"></polyline>
<line x1="12" y1="3" x2="12" y2="15"></line>
</svg>
</div>
<p class="upload-text">{{ content.uploadText }}</p>
<p class="upload-subtext">{{ content.uploadSubtext }}</p>
</div>
</div>

<!-- Canvas items (images, text, color fields) -->
<div 
v-for="item in canvasItems" 
:key="item.id"
class="canvas-item"
:class="{ 
'selected': selectedItemId === item.id,
'image-item': item.type === 'image',
'text-item': item.type === 'text',
'color-item': item.type === 'color'
}"
:style="getItemStyle(item)"
@mousedown="startDrag($event, item)"
@touchstart="startDrag($event, item)"
@click.stop="selectItem(item.id)"
>
<!-- Image content -->
<img v-if="item.type === 'image'" :src="item.src" alt="Canvas image" />

<!-- Text content -->
<div v-else-if="item.type === 'text'" 
class="text-content" 
:style="getTextStyle(item)"
@dblclick="editText(item)"
>
<div v-if="editingTextId !== item.id">{{ item.text }}</div>
<textarea v-else
:ref="el => { if (el) textEditor.value = el; }"
v-model="item.text"
@blur="finishTextEdit"
@keydown.enter="finishTextEdit"
:style="getTextStyle(item)"
></textarea>
</div>

<!-- Color field content -->
<div v-else-if="item.type === 'color'" class="color-content" :style="{backgroundColor: item.color}"></div>

<!-- Item controls -->
<div v-if="selectedItemId === item.id" class="item-controls">
<!-- Delete button -->
<button 
class="control-button delete-button"
@click.stop="deleteItem(item.id)"
:title="content.deleteButtonText"
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<polyline points="3 6 5 6 21 6"></polyline>
<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
<line x1="10" y1="11" x2="10" y2="17"></line>
<line x1="14" y1="11" x2="14" y2="17"></line>
</svg>
</button>

<!-- Resize handle for color fields and text -->
<div 
v-if="item.type === 'color' || item.type === 'text'"
class="resize-handle"
@mousedown.stop="startResize($event, item)"
@touchstart.stop="startResize($event, item)"
></div>
</div>
</div>

<!-- Controls -->
<div v-if="canvasItems.length > 0" class="canvas-controls">
<!-- Add text button -->
<button 
class="control-button add-text-button"
@click.stop="addText"
title="Add Text"
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<polyline points="4 7 4 4 20 4 20 7"></polyline>
<line x1="9" y1="20" x2="15" y2="20"></line>
<line x1="12" y1="4" x2="12" y2="20"></line>
</svg>
</button>

<!-- Add color field button -->
<button 
class="control-button add-color-button"
@click.stop="addColorField"
title="Add Color Field"
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="12" cy="12" r="10"></circle>
<circle cx="12" cy="12" r="6"></circle>
</svg>
</button>

<!-- Reset button -->
<button 
class="reset-button"
@click.stop="resetCanvas"
:title="content.resetButtonText"
>
{{ content.resetButtonText }}
</button>
</div>
</div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
props: {
content: { 
type: Object, 
required: true 
},
uid: { 
type: String, 
required: true 
},
},
emits: ['trigger-event'],
setup(props, { emit }) {
// Editor state
const isEditing = computed(() => {
// eslint-disable-next-line no-unreachable
return false;
});

// Canvas reference
const canvasRef = ref(null);

// Canvas state
const canvasItems = ref([]);
const isDraggingOver = ref(false);
const selectedItemId = ref(null);
const draggedItem = ref(null);
const dragOffset = ref({ x: 0, y: 0 });
const resizingItem = ref(null);
const resizeStartSize = ref({ width: 0, height: 0 });
const resizeStartPos = ref({ x: 0, y: 0 });
const editingTextId = ref(null);
const textEditor = ref(null);

// Grid calculations
const gridLinesCount = computed(() => {
if (!canvasRef.value) return { x: 0, y: 0 };

const rect = canvasRef.value.getBoundingClientRect();
const gridSize = props.content?.gridSize || 50;

return {
x: Math.floor(rect.width / gridSize),
y: Math.floor(rect.height / gridSize)
};
});

// Internal variables for component state
const { value: canvasItemsVar, setValue: setCanvasItemsVar } = wwLib.wwVariable.useComponentVariable({
uid: props.uid,
name: 'items',
type: 'array',
defaultValue: [],
});

// Sync internal variable with component state
watch(canvasItemsVar, (newItems) => {
if (JSON.stringify(newItems) !== JSON.stringify(canvasItems.value)) {
canvasItems.value = newItems;
}
}, { immediate: true });

watch(canvasItems, (newItems) => {
setCanvasItemsVar(newItems);
emit('trigger-event', {
name: 'change',
event: { items: newItems }
});
}, { deep: true });

// Canvas styling
const canvasStyle = computed(() => ({
backgroundColor: props.content?.backgroundColor || '#f5f5f5',
backgroundImage: props.content?.backgroundPattern ? `url(${props.content.backgroundPattern})` : 'none',
minHeight: props.content?.minHeight || '300px',
borderRadius: props.content?.borderRadius || '8px',
border: props.content?.showBorder ? `1px solid ${props.content?.borderColor || '#ddd'}` : 'none',
position: 'relative',
}));

// Item positioning and styling
const getItemStyle = (item) => {
const style = {
left: `${item.x}px`,
top: `${item.y}px`,
zIndex: item.id === selectedItemId.value ? 10 : 1,
};

if (item.type === 'image' || item.type === 'color') {
style.width = `${item.width}px`;
}

if (item.type === 'color') {
style.height = `${item.height || 100}px`;
}

return style;
};

// Text styling
const getTextStyle = (item) => {
return {
color: item.textColor || '#000000',
fontSize: `${item.fontSize || 16}px`,
fontWeight: item.fontWeight || 'normal',
fontStyle: item.fontStyle || 'normal',
textAlign: item.textAlign || 'left',
width: `${item.width || 200}px`,
height: item.height ? `${item.height}px` : 'auto',
backgroundColor: 'transparent',
border: 'none',
resize: 'none',
overflow: 'hidden',
fontFamily: item.fontFamily || 'inherit'
};
};

// Snap position to grid
const snapToGrid = (x, y) => {
if (!props.content?.snapToGrid) return { x, y };

const gridSize = props.content?.gridSize || 50;
return {
x: Math.round(x / gridSize) * gridSize,
y: Math.round(y / gridSize) * gridSize
};
};

// Drag and drop handlers
const onDragOver = (event) => {
isDraggingOver.value = true;
};

const onDrop = (event) => {
isDraggingOver.value = false;

// Handle file drop
if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
handleFileUpload(event.dataTransfer.files);
}
};

const handleFileUpload = (files) => {
if (isEditing.value) return;

Array.from(files).forEach(file => {
if (!file.type.match('image.*')) return;

const reader = new FileReader();
reader.onload = (e) => {
// Use the canvas ref instead of querying the DOM
const rect = canvasRef.value ? canvasRef.value.getBoundingClientRect() : { width: 400, height: 400 };
const centerX = rect.width / 2 - 100; // Center the image, assuming 200px width
const centerY = rect.height / 2 - 100; // Center the image, assuming 200px height

// Snap to grid if enabled
const position = props.content?.snapToGrid 
? snapToGrid(centerX, centerY)
: { x: centerX, y: centerY };

const newImage = {
id: uuidv4(),
type: 'image',
src: e.target.result,
x: position.x,
y: position.y,
width: 200, // Default width
};

canvasItems.value = [...canvasItems.value, newImage];
selectItem(newImage.id);

emit('trigger-event', {
name: 'upload',
event: { item: newImage }
});
};
reader.readAsDataURL(file);
});
};

// Item manipulation
const startDrag = (event, item) => {
if (isEditing.value) return;

event.preventDefault();
selectItem(item.id);
draggedItem.value = item;

const clientX = event.clientX || (event.touches && event.touches[0].clientX);
const clientY = event.clientY || (event.touches && event.touches[0].clientY);

if (clientX && clientY) {
dragOffset.value = {
x: clientX - item.x,
y: clientY - item.y
};

document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, { passive: false });
document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);
}
};

const onDrag = (event) => {
if (!draggedItem.value) return;

event.preventDefault();

const clientX = event.clientX || (event.touches && event.touches[0].clientX);
const clientY = event.clientY || (event.touches && event.touches[0].clientY);

if (clientX && clientY && canvasRef.value) {
const canvasRect = canvasRef.value.getBoundingClientRect();
let newX = clientX - canvasRect.left - dragOffset.value.x;
let newY = clientY - canvasRect.top - dragOffset.value.y;

// Snap to grid if enabled
if (props.content?.snapToGrid) {
const snapped = snapToGrid(newX, newY);
newX = snapped.x;
newY = snapped.y;
}

// Update the item position
const updatedItems = canvasItems.value.map(item => {
if (item.id === draggedItem.value.id) {
return { ...item, x: newX, y: newY };
}
return item;
});

canvasItems.value = updatedItems;
}
};

const stopDrag = () => {
if (draggedItem.value) {
emit('trigger-event', {
name: 'move',
event: { item: draggedItem.value }
});

draggedItem.value = null;
}

document.removeEventListener('mousemove', onDrag);
document.removeEventListener('touchmove', onDrag);
document.removeEventListener('mouseup', stopDrag);
document.removeEventListener('touchend', stopDrag);
};

// Resize handlers
const startResize = (event, item) => {
if (isEditing.value) return;

event.preventDefault();
event.stopPropagation();

resizingItem.value = item;
resizeStartSize.value = { 
width: item.width || 200, 
height: item.height || 100 
};
resizeStartPos.value = { 
x: event.clientX || (event.touches && event.touches[0].clientX), 
y: event.clientY || (event.touches && event.touches[0].clientY) 
};

document.addEventListener('mousemove', onResize);
document.addEventListener('touchmove', onResize, { passive: false });
document.addEventListener('mouseup', stopResize);
document.addEventListener('touchend', stopResize);
};

const onResize = (event) => {
if (!resizingItem.value) return;

event.preventDefault();

const clientX = event.clientX || (event.touches && event.touches[0].clientX);
const clientY = event.clientY || (event.touches && event.touches[0].clientY);

if (clientX && clientY) {
const deltaX = clientX - resizeStartPos.value.x;
const deltaY = clientY - resizeStartPos.value.y;

let newWidth = Math.max(50, resizeStartSize.value.width + deltaX);
let newHeight = Math.max(50, resizeStartSize.value.height + deltaY);

// Snap sizes to grid if enabled
if (props.content?.snapToGrid) {
const gridSize = props.content?.gridSize || 50;
newWidth = Math.round(newWidth / gridSize) * gridSize;
newHeight = Math.round(newHeight / gridSize) * gridSize;
}

// Update the item size
const updatedItems = canvasItems.value.map(item => {
if (item.id === resizingItem.value.id) {
return { 
...item, 
width: newWidth,
height: newHeight
};
}
return item;
});

canvasItems.value = updatedItems;
}
};

const stopResize = () => {
if (resizingItem.value) {
emit('trigger-event', {
name: 'resize',
event: { item: resizingItem.value }
});

resizingItem.value = null;
}

document.removeEventListener('mousemove', onResize);
document.removeEventListener('touchmove', onResize);
document.removeEventListener('mouseup', stopResize);
document.removeEventListener('touchend', stopResize);
};

// Text editing
const editText = (item) => {
if (isEditing.value) return;

editingTextId.value = item.id;

nextTick(() => {
// Fix: Use an array check since textEditor is a ref to potentially multiple elements
if (textEditor.value && Array.isArray(textEditor.value)) {
// If it's an array of elements, find the first one
const editor = textEditor.value[0];
if (editor && typeof editor.focus === 'function') {
editor.focus();
editor.select();
}
} else if (textEditor.value && typeof textEditor.value.focus === 'function') {
// If it's a single element
textEditor.value.focus();
textEditor.value.select();
}
});
};

// Selection and deletion
const selectItem = (id) => {
if (isEditing.value) return;
selectedItemId.value = id;
};

const onCanvasClick = () => {
selectedItemId.value = null;
editingTextId.value = null;
};

const deleteItem = (id) => {
if (isEditing.value) return;

const itemToDelete = canvasItems.value.find(item => item.id === id);
canvasItems.value = canvasItems.value.filter(item => item.id !== id);
selectedItemId.value = null;

emit('trigger-event', {
name: 'delete',
event: { item: itemToDelete }
});
};

const resetCanvas = () => {
if (isEditing.value) return;

canvasItems.value = [];
selectedItemId.value = null;

emit('trigger-event', {
name: 'reset',
event: { }
});
};

// Add new items
const addText = () => {
if (isEditing.value) return;

// Use the canvas ref to get dimensions
const rect = canvasRef.value ? canvasRef.value.getBoundingClientRect() : { width: 400, height: 400 };
const centerX = rect.width / 2 - 100;
const centerY = rect.height / 2 - 25;

// Snap to grid if enabled
const position = props.content?.snapToGrid 
? snapToGrid(centerX, centerY)
: { x: centerX, y: centerY };

const newText = {
id: uuidv4(),
type: 'text',
text: 'Double-click to edit text',
x: position.x,
y: position.y,
width: 200,
fontSize: 16,
textColor: '#000000',
fontWeight: 'normal',
fontStyle: 'normal',
textAlign: 'left',
fontFamily: 'Arial'
};

canvasItems.value = [...canvasItems.value, newText];
selectItem(newText.id);

emit('trigger-event', {
name: 'addText',
event: { item: newText }
});
};

const addColorField = () => {
if (isEditing.value) return;

// Use the canvas ref to get dimensions
const rect = canvasRef.value ? canvasRef.value.getBoundingClientRect() : { width: 400, height: 400 };
const centerX = rect.width / 2 - 75;
const centerY = rect.height / 2 - 75;

// Snap to grid if enabled
const position = props.content?.snapToGrid 
? snapToGrid(centerX, centerY)
: { x: centerX, y: centerY };

const newColorField = {
id: uuidv4(),
type: 'color',
color: props.content?.defaultColorField || '#3498db',
x: position.x,
y: position.y,
width: 150,
height: 150
};

canvasItems.value = [...canvasItems.value, newColorField];
selectItem(newColorField.id);

emit('trigger-event', {
name: 'addColorField',
event: { item: newColorField }
});
};

// Public methods
const addImage = (imageUrl) => {
if (!imageUrl) return;

const img = new Image();
img.onload = () => {
// Use the canvas ref to get dimensions
const rect = canvasRef.value ? canvasRef.value.getBoundingClientRect() : { width: 400, height: 400 };
const centerX = rect.width / 2 - 100;
const centerY = rect.height / 2 - 100;

// Snap to grid if enabled
const position = props.content?.snapToGrid 
? snapToGrid(centerX, centerY)
: { x: centerX, y: centerY };

const newImage = {
id: uuidv4(),
type: 'image',
src: imageUrl,
x: position.x,
y: position.y,
width: 200,
};

canvasItems.value = [...canvasItems.value, newImage];
selectItem(newImage.id);
};
img.src = imageUrl;
};

// Cleanup
onUnmounted(() => {
document.removeEventListener('mousemove', onDrag);
document.removeEventListener('touchmove', onDrag);
document.removeEventListener('mouseup', stopDrag);
document.removeEventListener('touchend', stopDrag);
document.removeEventListener('mousemove', onResize);
document.removeEventListener('touchmove', onResize);
document.removeEventListener('mouseup', stopResize);
document.removeEventListener('touchend', stopResize);
});

return {
canvasRef,
canvasItems,
isDraggingOver,
selectedItemId,
editingTextId,
textEditor,
canvasStyle,
gridLinesCount,
getItemStyle,
getTextStyle,
onDragOver,
onDrop,
startDrag,
onCanvasClick,
selectItem,
deleteItem,
resetCanvas,
addImage,
addText,
addColorField,
editText,
finishTextEdit,
startResize,
isEditing
};
}
};
</script>

<style lang="scss" scoped>
.interactive-canvas {
position: relative;
width: 100%;
min-height: 300px;
overflow: hidden;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transition: background-color 0.3s ease;

// Grid lines
.grid-lines {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
pointer-events: none;
z-index: 0;

.grid-line {
position: absolute;
background-color: rgba(0, 0, 0, 0.1);

&.vertical {
width: 1px;
height: 100%;
top: 0;
}

&.horizontal {
height: 1px;
width: 100%;
left: 0;
}
}
}

.upload-zone {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px dashed #ccc;
border-radius: 8px;
transition: all 0.3s ease;
padding: 20px;
box-sizing: border-box;

&.drag-over {
background-color: rgba(0, 0, 0, 0.05);
border-color: #999;
}

.upload-content {
text-align: center;

.upload-icon {
margin-bottom: 16px;
color: #666;
}

.upload-text {
font-size: 18px;
font-weight: 500;
margin-bottom: 8px;
color: #333;
}

.upload-subtext {
font-size: 14px;
color: #666;
}
}
}

.canvas-item {
position: absolute;
cursor: move;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
transition: box-shadow 0.2s ease, transform 0.2s ease;

&.selected {
box-shadow: 04px 20px rgba(0, 0, 0, 0.15);
z-index: 10;
}

&.image-item {
img {
width: 100%;
height: auto;
display: block;
pointer-events: none;
}
}

&.text-item {
padding: 8px;
cursor: text;

.text-content {
width: 100%;
height: 100%;

textarea {
width: 100%;
padding: 0;
margin: 0;
outline: none;
}
}
}

&.color-item {
.color-content {
width: 100%;
height: 100%;
}
}

.item-controls {
position: absolute;

.control-button {
position: absolute;
width: 24px;
height: 24px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
transition: all 0.2s ease;
border: none;

&.delete-button {
top: -10px;
right: -10px;
background-color: #ff4d4f;
color: white;

&:hover {
background-color: #ff7875;
transform: scale(1.1);
}
}
}

.resize-handle {
position: absolute;
bottom: -10px;
right: -10px;
width: 20px;
height: 20px;
background-color: white;
border: 2px solid #1890ff;
border-radius: 50%;
cursor: nwse-resize;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

&:hover {
transform: scale(1.1);
}
}
}
}

.canvas-controls {
position: absolute;
bottom: 16px;
right: 16px;
display: flex;
gap: 8px;

.control-button {
width: 36px;
height: 36px;
border-radius: 50%;
background-color: #1890ff;
color: white;
border: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
transition: all 0.2s ease;

&:hover {
background-color: #40a9ff;
transform: scale(1.05);
}
}

.reset-button {
padding: 8px 16px;
background-color: #f5f5f5;
border: 1px solid #d9d9d9;
border-radius: 4px;
cursor: pointer;
font-size: 14px;
transition: all 0.2s ease;

&:hover {
background-color: #e6e6e6;
}
}
}
}

@media (max-width: 768px) {
.interactive-canvas {
min-height: 200px;

.upload-zone {
.upload-content {
.upload-icon {
transform: scale(0.8);
}

.upload-text {
font-size: 16px;
}

.upload-subtext {
font-size: 12px;
}
}
}

.canvas-controls {
bottom: 8px;
right: 8px;

.reset-button {
padding: 6px 12px;
font-size: 12px;
}
}
}
}
</style>