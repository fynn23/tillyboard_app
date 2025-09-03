<template>
  <div 
    class="video-range-slider" 
    :style="{ 
      '--track-height': content.trackHeight,
      '--track-color': content.trackColor,
      '--progress-color': content.progressColor,
      '--thumb-color': content.thumbColor,
      '--thumb-size': content.thumbSize
    }"
  >
    <div 
      class="slider-container"
      @mousemove="handleMouseMove"
      @mouseleave="hidePreview"
    >
      <input 
        type="range" 
        class="range-slider"
        min="0" 
        :max="duration" 
        :value="currentTime" 
        step="0.01"
        @input="updateTime"
        @mouseenter="showPreview = true"
        @mouseleave="showPreview = false"
      />
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
    </div>

    <div 
      v-if="showPreview && previewUrl" 
      class="preview-container"
      :style="{ left: previewPosition + 'px' }"
    >
      <video 
        ref="previewVideo" 
        class="preview-video" 
        :src="previewUrl" 
        preload="auto"
        muted
      ></video>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';

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

    // Internal variables
    const { value: currentTime, setValue: setCurrentTime } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentTime',
      type: 'number',
      defaultValue: computed(() => props.content.initialTime ?? 0),
    });

    const duration = computed(() => props.content.duration || 100);
    const videoUrl = computed(() => props.content.videoUrl || '');
    const previewUrl = computed(() => props.content.previewUrl || props.content.videoUrl || '');
    
    // Preview functionality
    const showPreview = ref(false);
    const previewPosition = ref(0);
    const previewVideo = ref(null);
    const previewTime = ref(0);
    
    const progressPercentage = computed(() => {
      if (!duration.value) return 0;
      return (currentTime.value / duration.value) * 100;
    });

    // Handle mouse movement over slider to update preview
    const handleMouseMove = (event) => {
      if (isEditing.value) return;
      
      const sliderRect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - sliderRect.left;
      const percentage = Math.min(Math.max(offsetX / sliderRect.width, 0), 1);
      
      previewPosition.value = offsetX - 50; // Center the preview (assuming 100px width)
      previewTime.value = percentage * duration.value;
      
      // Update preview video time if available
      if (previewVideo.value && previewUrl.value) {
        previewVideo.value.currentTime = previewTime.value;
      }
    };

    const hidePreview = () => {
      showPreview.value = false;
    };

    const updateTime = (event) => {
      if (isEditing.value) return;
      
      const newTime = parseFloat(event.target.value);
      setCurrentTime(newTime);
      
      emit('trigger-event', {
        name: 'change',
        event: { value: newTime }
      });
    };

    // Watch for changes to initialTime from outside
    watch(() => props.content.initialTime, (newVal) => {
      if (newVal !== undefined && newVal !== currentTime.value) {
        setCurrentTime(parseFloat(newVal));
        
        emit('trigger-event', {
          name: 'initValueChange',
          event: { value: parseFloat(newVal) }
        });
      }
    });

    // Methods exposed as actions
    const setTime = (time) => {
      if (typeof time !== 'number') return;
      const newTime = Math.min(Math.max(time, 0), duration.value);
      setCurrentTime(newTime);
    };

    return {
      currentTime,
      duration,
      videoUrl,
      previewUrl,
      showPreview,
      previewPosition,
      previewVideo,
      previewTime,
      progressPercentage,
      handleMouseMove,
      hidePreview,
      updateTime,
      setTime
    };
  }
};
</script>

<style lang="scss" scoped>
.video-range-slider {
  position: relative;
  width: 100%;
  padding: 10px 0;
}

.slider-container {
  position: relative;
  width: 100%;
  height: var(--track-height, 6px);
}

.range-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  z-index: 10;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumb-size, 16px);
    height: var(--thumb-size, 16px);
    border-radius: 50%;
    background: var(--thumb-color, #ffffff);
    cursor: pointer;
    border: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }
  
  &::-moz-range-thumb {
    width: var(--thumb-size, 16px);
    height: var(--thumb-size, 16px);
    border-radius: 50%;
    background: var(--thumb-color, #ffffff);
    cursor: pointer;
    border: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }
  
  &:focus {
    outline: none;
  }
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--progress-color, #ff0000);
  border-radius: calc(var(--track-height, 6px) / 2);
  pointer-events: none;
}

.slider-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--track-color, #cccccc);
  border-radius: calc(var(--track-height, 6px) / 2);
}

.preview-container {
  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
  margin-bottom: 10px;
  width: 150px;
  height: 84px;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 20;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
  }
}

.preview-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>