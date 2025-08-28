<template>
  <div
    class="custom-video-player"
    :class="{ 'controls-visible': controlsVisible, 'is-playing': isPlaying }"
    @mousemove="showControls"
    @mouseleave="hideControlsDelayed"
  >
    <video
      ref="videoElement"
      class="video-element"
      :src="videoSrc"
      :poster="content.posterImage"
      :muted="content.startMuted"
      :autoplay="content.autoplay"
      :loop="content.loop"
      :playsinline="content.playInline"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @volumechange="onVolumeChange"
      @click="togglePlay"
    ></video>

    <div
      v-if="content.showBigPlayButton"
      class="big-play-button-container"
      @click="togglePlay"
      v-show="!isPlaying || controlsVisible"
    >
      <div class="big-play-button" :class="{ 'is-playing': isPlaying }">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" class="play-icon">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" class="pause-icon">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </div>
    </div>

    <div
      class="video-controls"
      v-show="content.showControls !== false && controlsVisible"
      @mouseenter="clearHideControlsTimeout"
      @mouseleave="hideControlsDelayed"
    >
      <div
        class="progress-container"
        @click="seekVideo"
        @mousemove="updateHoverPosition"
        @mouseleave="hideHover"
      >
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
          <div class="progress-hover" :style="{ left: `${hoverPosition}px` }" v-if="isHovering">
            <div class="hover-time">{{ formatTime(hoverTime) }}</div>
          </div>
        </div>
      </div>

      <div class="controls-row">
        <button class="control-button play-pause" @click.stop="togglePlay">
          <svg v-if="!isPlaying" viewBox="0 0 24 24" class="play-icon">
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="pause-icon">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span>
          <span class="time-separator">/</span>
          <span>{{ formatTime(duration) }}</span>
          <span class="framerate-display" v-if="framerate > 0">{{ framerate }} fps</span>
        </div>

        <div class="volume-control">
          <button class="control-button volume-button" @click.stop="toggleMute">
            <svg v-if="isMuted || volume === 0" viewBox="0 0 24 24" class="volume-mute-icon">
              <path
                d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
              />
            </svg>
            <svg v-else-if="volume < 0.5" viewBox="0 0 24 24" class="volume-low-icon">
              <path d="M7 9v6h4l5 5V4l-5 5H7z" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="volume-high-icon">
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              />
            </svg>
          </button>
          <div class="volume-slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              class="volume-slider"
              :value="volume"
              @input="setVolume($event.target.value)"
              @click.stop
            />
          </div>
        </div>

        <button class="control-button fullscreen-button" @click.stop="toggleFullscreen">
          <svg v-if="!isFullscreen" viewBox="0 0 24 24" class="fullscreen-icon">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="fullscreen-exit-icon">
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

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

    // Video element reference
    const videoElement = ref(null);

    // Player state
    const isPlaying = ref(false);
    const isMuted = ref(props.content?.startMuted || false);
    const volume = ref(props.content?.startMuted ? 0 : (props.content?.volume || 1));
    const currentTime = ref(0);
    const duration = ref(0);
    const isFullscreen = ref(false);
    const controlsVisible = ref(true);
    const controlsTimeout = ref(null);
    const framerate = ref(0); // This will hold the detected/estimated framerate

    // Internal variable for current time (for WeWeb)
    const { value: currentTimeVar, setValue: setCurrentTimeVar } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentTime',
      type: 'number',
      defaultValue: 0
    });

    // Internal variable for duration (for WeWeb)
    const { value: durationVar, setValue: setDurationVar } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'duration',
      type: 'number',
      defaultValue: 0
    });

    // Internal variable for playing state (for WeWeb)
    const { value: isPlayingVar, setValue: setIsPlayingVar } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isPlaying',
      type: 'boolean',
      defaultValue: false
    });

    // Internal variable for framerate (for WeWeb)
    const { value: framerateVar, setValue: setFramerateVar } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'framerate',
      type: 'number',
      defaultValue: 0
    });

    // Hover state for progress bar
    const isHovering = ref(false);
    const hoverPosition = ref(0);
    const hoverTime = ref(0);

    // Video source computed property
    const videoSrc = computed(() => {
      return props.content?.videoSrc || '';
    });

    // Progress percentage computed property
    const progressPercentage = computed(() => {
      if (duration.value <= 0 || isNaN(duration.value) || !isFinite(duration.value)) return 0;
      return (currentTime.value / duration.value) * 100;
    });

    // Watch for changes in video source
    watch(() => props.content?.videoSrc, (newSrc) => {
      if (newSrc && videoElement.value) {
        // Reset player state when source changes
        currentTime.value = 0;
        duration.value = 0;
        framerate.value = 0; // Reset framerate on source change
        setCurrentTimeVar(0);
        setDurationVar(0);
        setFramerateVar(0); // Reset framerate variable on source change

        videoElement.value.load(); // Load the new video

        // Autoplay if configured (only if not in editor)
        if (props.content?.autoplay && !isEditing.value) {
          playVideo();
        }
      }
    });

    // Watch for changes in volume setting
    watch(() => props.content?.volume, (newVolume) => {
      if (newVolume !== undefined && videoElement.value && !isMuted.value) {
        videoElement.value.volume = newVolume;
        volume.value = newVolume;
      }
    });

    // Watch for changes in muted setting
    watch(() => props.content?.startMuted, (newMuted) => {
      if (newMuted !== undefined && videoElement.value) {
        videoElement.value.muted = newMuted;
        isMuted.value = newMuted;
      }
    });

    // Format time (seconds) to MM:SS format
    const formatTime = (timeInSeconds) => {
      if (isNaN(timeInSeconds) || !isFinite(timeInSeconds) || timeInSeconds < 0) return '00:00';

      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);

      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Video event handlers
    const onTimeUpdate = () => {
      if (!videoElement.value) return;
      currentTime.value = videoElement.value.currentTime;
      setCurrentTimeVar(currentTime.value);
    };

    let frameEstimationRAFId = null; // Stores requestAnimationFrame ID
    let frameEstimationStartVideoTime = 0;
    let frameEstimationFrameCount = 0;
    let frameEstimationStartTime = 0; // performance.now()

    const estimateFramerate = () => {
        if (!videoElement.value || !isPlaying.value || isEditing.value || framerate.value > 0) {
            cancelAnimationFrame(frameEstimationRAFId);
            frameEstimationRAFId = null;
            return;
        }

        const currentVideoTime = videoElement.value.currentTime;
        const now = performance.now();

        // Initialize on first call or when video time jumps (seek)
        if (frameEstimationStartTime === 0 || Math.abs(currentVideoTime - frameEstimationStartVideoTime - (frameEstimationFrameCount * (1/30))) > 1) {
            frameEstimationStartTime = now;
            frameEstimationStartVideoTime = currentVideoTime;
            frameEstimationFrameCount = 0;
        }

        // Count frames as video time progresses
        frameEstimationFrameCount++;

        const elapsedVideoTime = currentVideoTime - frameEstimationStartVideoTime;
        const elapsedRealTime = (now - frameEstimationStartTime) / 1000; // Convert to seconds

        // Only calculate if enough time/frames have passed for a reasonable average
        if (elapsedVideoTime >= 1 && frameEstimationFrameCount >= 20) { // After 1 second and 20+ "frames"
            const estimatedFps = Math.round(frameEstimationFrameCount / elapsedVideoTime);
            // Basic sanity check to avoid extreme values and 0
            if (estimatedFps > 0 && estimatedFps < 120) {
                framerate.value = estimatedFps;
                setFramerateVar(framerate.value);
                cancelAnimationFrame(frameEstimationRAFId); // Stop estimation
                frameEstimationRAFId = null;
                return; // Exit recursion
            } else if (elapsedRealTime >= 5 && estimatedFps > 0) { // If it takes longer, accept it
                 framerate.value = estimatedFps;
                 setFramerateVar(framerate.value);
                 cancelAnimationFrame(frameEstimationRAFId);
                 frameEstimationRAFId = null;
                 return;
            }
        }
        frameEstimationRAFId = requestAnimationFrame(estimateFramerate);
    };


    const onLoadedMetadata = () => {
      if (!videoElement.value) return;

      duration.value = videoElement.value.duration;
      setDurationVar(duration.value);

      // Attempt to detect framerate from videoTracks first (most accurate)
      if (videoElement.value.videoTracks && videoElement.value.videoTracks.length > 0) {
        const detectedFps = videoElement.value.videoTracks[0].frameRate;
        if (detectedFps > 0) {
          framerate.value = detectedFps;
          setFramerateVar(framerate.value);
        }
      }

      // If framerate still 0 (not detected via videoTracks) and not in editor,
      // and video is playing, start estimation via requestAnimationFrame
      if (framerate.value === 0 && !isEditing.value && isPlaying.value) {
        if (!frameEstimationRAFId) { // Prevent multiple RAF loops
            frameEstimationStartVideoTime = videoElement.value.currentTime;
            frameEstimationStartTime = performance.now();
            frameEstimationFrameCount = 0;
            frameEstimationRAFId = requestAnimationFrame(estimateFramerate);
        }
      }

      emit('trigger-event', {
        name: 'loaded',
        event: {
          duration: duration.value
        }
      });
    };

    const onPlay = () => {
      isPlaying.value = true;
      setIsPlayingVar(true);

      // If framerate hasn't been detected yet, start/continue estimation
      if (framerate.value === 0 && !isEditing.value) {
        if (!frameEstimationRAFId) {
            frameEstimationStartVideoTime = videoElement.value.currentTime;
            frameEstimationStartTime = performance.now();
            frameEstimationFrameCount = 0;
            frameEstimationRAFId = requestAnimationFrame(estimateFramerate);
        }
      }

      emit('trigger-event', {
        name: 'play',
        event: {
          currentTime: currentTime.value
        }
      });
      showControls(); // Ensure controls are shown on play
    };

    const onPause = () => {
      isPlaying.value = false;
      setIsPlayingVar(false);
      cancelAnimationFrame(frameEstimationRAFId); // Stop estimation when paused
      frameEstimationRAFId = null;

      emit('trigger-event', {
        name: 'pause',
        event: {
          currentTime: currentTime.value
        }
      });
      showControls(); // Ensure controls are shown on pause
    };

    const onEnded = () => {
      isPlaying.value = false;
      setIsPlayingVar(false);
      cancelAnimationFrame(frameEstimationRAFId); // Stop estimation when ended
      frameEstimationRAFId = null;

      emit('trigger-event', {
        name: 'ended',
        event: {}
      });

      // If loop is enabled, restart the video
      if (props.content?.loop && videoElement.value) {
        videoElement.value.currentTime = 0;
        playVideo();
      }
      showControls(); // Ensure controls are shown when ended
    };

    const onVolumeChange = () => {
      if (!videoElement.value) return;

      volume.value = videoElement.value.volume;
      isMuted.value = videoElement.value.muted;

      emit('trigger-event', {
        name: 'volumeChange',
        event: {
          volume: volume.value,
          muted: isMuted.value
        }
      });
    };

    // Player control functions
    const playVideo = () => {
      if (isEditing.value) return;
      if (!videoElement.value) return;

      // Handle autoplay policy: try muted if initial unmuted play fails and autoplay is desired
      const initialPlayPromise = videoElement.value.play();
      if (initialPlayPromise !== undefined) {
          initialPlayPromise.catch(error => {
              // NotAllowedError is typical for unmuted autoplay without user gesture
              if (error.name === "NotAllowedError" && props.content?.autoplay && !props.content?.startMuted) {
                  console.warn("Autoplay was prevented (unmuted). Attempting muted autoplay.");
                  videoElement.value.muted = true; // Mute it
                  isMuted.value = true;
                  const mutedPlayPromise = videoElement.value.play(); // Try playing muted
                  if (mutedPlayPromise !== undefined) {
                      mutedPlayPromise.catch(mutedError => {
                          console.error('Error playing video (muted retry failed):', mutedError);
                          isPlaying.value = false; // Ensure isPlaying is false if play fails
                          setIsPlayingVar(false);
                      });
                  }
              } else if (error.name === "AbortError") {
                  console.log("Video play was aborted (e.g., user paused before promise resolved).");
                  isPlaying.value = false; // Ensure isPlaying is false if play fails
                  setIsPlayingVar(false);
              } else {
                  console.error('Error playing video:', error);
                  isPlaying.value = false; // Ensure isPlaying is false if play fails
                  setIsPlayingVar(false);
              }
          });
      }
    };


    const pauseVideo = () => {
      if (isEditing.value) return;
      if (!videoElement.value) return;

      videoElement.value.pause();
    };

    const togglePlay = () => {
      if (isEditing.value) return;
      if (!videoElement.value) return;

      if (isPlaying.value) {
        pauseVideo();
      } else {
        playVideo();
      }
    };

    const seekVideo = (event) => {
      if (isEditing.value) return;
      if (!videoElement.value || duration.value <= 0 || isNaN(duration.value) || !isFinite(duration.value)) return;

      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = (event.clientX - rect.left) / rect.width;
      const newTime = clickPosition * duration.value;

      videoElement.value.currentTime = newTime;
      currentTime.value = newTime;
      setCurrentTimeVar(newTime);
    };

    const updateHoverPosition = (event) => {
      if (!videoElement.value || duration.value <= 0 || isNaN(duration.value) || !isFinite(duration.value)) {
        isHovering.value = false; // Hide hover if duration is invalid
        return;
      }

      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const hoverPos = event.clientX - rect.left;
      const hoverPercentage = Math.max(0, Math.min(1, hoverPos / rect.width)); // Clamp between 0 and 1

      isHovering.value = true;
      hoverPosition.value = hoverPos;
      hoverTime.value = hoverPercentage * duration.value;
    };

    const hideHover = () => {
      isHovering.value = false;
    };

    const setVolume = (newVolume) => {
      if (isEditing.value) return;
      if (!videoElement.value) return;

      const volumeValue = parseFloat(newVolume);
      // Ensure volume is between 0 and 1
      const clampedVolume = Math.max(0, Math.min(1, volumeValue));

      videoElement.value.volume = clampedVolume;
      volume.value = clampedVolume;

      // If setting volume above 0, ensure it's not muted
      if (clampedVolume > 0 && videoElement.value.muted) {
        videoElement.value.muted = false;
        isMuted.value = false;
      } else if (clampedVolume === 0 && !videoElement.value.muted) {
        // If volume is set to 0, mute it
        videoElement.value.muted = true;
        isMuted.value = true;
      }
    };

    const toggleMute = () => {
      if (isEditing.value) return;
      if (!videoElement.value) return;

      videoElement.value.muted = !videoElement.value.muted;
      isMuted.value = videoElement.value.muted;
      // If we unmute and volume was 0, set it to a default or previous value
      if (!videoElement.value.muted && videoElement.value.volume === 0) {
        videoElement.value.volume = props.content?.volume || 0.5; // Restore to default or prop volume (0.5 if prop not set)
        volume.value = videoElement.value.volume;
      }
    };

    // Fullscreen handling
    const toggleFullscreen = () => {
      if (isEditing.value) return;

      const videoContainer = videoElement.value?.parentElement;
      if (!videoContainer) return;

      if (!isFullscreen.value) {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) {
          videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
          videoContainer.msRequestFullscreen();
        }
      } else {
        const doc = wwLib.getFrontDocument();
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    };

    // Controls visibility
    const showControls = () => {
      // Controls are always visible in editor mode, unless explicitly hidden by prop
      if (props.content?.showControls === false) return;
      if (isEditing.value) {
        controlsVisible.value = true;
        return;
      }

      controlsVisible.value = true;
      clearHideControlsTimeout();

      // Auto-hide only if configured and playing
      if (props.content?.autoHideControls && isPlaying.value) {
        controlsTimeout.value = setTimeout(() => {
          controlsVisible.value = false;
        }, 3000); // Hide after 3 seconds of inactivity
      }
    };

    const hideControlsDelayed = () => {
      // Do not hide controls in editor mode, unless explicitly hidden by prop
      if (props.content?.showControls === false) return;
      if (isEditing.value) return;

      if (props.content?.autoHideControls && isPlaying.value) {
        controlsTimeout.value = setTimeout(() => {
          controlsVisible.value = false;
        }, 1000); // Hide after 1 second of mouse leave
      }
    };

    const clearHideControlsTimeout = () => {
      if (controlsTimeout.value) {
        clearTimeout(controlsTimeout.value);
        controlsTimeout.value = null;
      }
    };

    // Fullscreen change event handler
    const handleFullscreenChange = () => {
      const doc = wwLib.getFrontDocument();
      isFullscreen.value = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement
      );
      // Ensure controls are visible when entering/exiting fullscreen
      showControls();
    };

    // Lifecycle hooks
    onMounted(() => {
      const doc = wwLib.getFrontDocument();
      doc.addEventListener('fullscreenchange', handleFullscreenChange);
      doc.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      doc.addEventListener('msfullscreenchange', handleFullscreenChange);

      // Initialize video with content properties
      if (videoElement.value) {
        if (props.content?.volume !== undefined) {
          videoElement.value.volume = props.content.volume;
          volume.value = props.content.volume;
        }

        if (props.content?.startMuted) {
          videoElement.value.muted = true;
          isMuted.value = true;
        }

        // If autoplay is true and not in editor, attempt to play
        // This is now handled within playVideo, which will attempt muted play if needed.
        if (props.content?.autoplay && !isEditing.value) {
          playVideo();
        }
      }
    });

    onBeforeUnmount(() => {
      const doc = wwLib.getFrontDocument();
      doc.removeEventListener('fullscreenchange', handleFullscreenChange);
      doc.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      doc.removeEventListener('msfullscreenchange', handleFullscreenChange);

      clearHideControlsTimeout();
      if (frameEstimationRAFId) { // Clean up requestAnimationFrame on unmount
        cancelAnimationFrame(frameEstimationRAFId);
        frameEstimationRAFId = null;
      }
    });

    // Public methods (actions)
    const seekToTime = (time) => {
      if (isEditing.value) return;
      if (!videoElement.value) return;

      const seekTime = parseFloat(time);
      if (isNaN(seekTime) || !isFinite(seekTime)) return;

      videoElement.value.currentTime = Math.min(Math.max(0, seekTime), duration.value || 0);
    };

    const seekToPercentage = (percentage) => {
      if (isEditing.value) return;
      if (!videoElement.value || duration.value <= 0 || isNaN(duration.value) || !isFinite(duration.value)) return;

      const seekPercentage = parseFloat(percentage);
      if (isNaN(seekPercentage) || !isFinite(seekPercentage)) return;

      const clampedPercentage = Math.min(Math.max(0, seekPercentage), 100);
      const newTime = (clampedPercentage / 100) * duration.value;

      videoElement.value.currentTime = newTime;
    };

    return {
      // Refs and Reactive State
      videoElement,
      isPlaying,
      isMuted,
      volume,
      currentTime,
      duration,
      isFullscreen,
      controlsVisible,
      isHovering,
      hoverPosition,
      hoverTime,
      framerate, // Exposed framerate state

      // Computed Properties
      videoSrc,
      progressPercentage,

      // Methods
      formatTime,
      onTimeUpdate,
      onLoadedMetadata,
      onPlay,
      onPause,
      onEnded,
      onVolumeChange,
      playVideo,
      pauseVideo,
      togglePlay,
      seekVideo,
      updateHoverPosition,
      hideHover,
      setVolume,
      toggleMute,
      toggleFullscreen,
      showControls,
      hideControlsDelayed,
      clearHideControlsTimeout,

      // Action Methods (exposed for WeWeb actions)
      seekToTime,
      seekToPercentage
    };
  }
};
</script>

<style lang="scss" scoped>
.custom-video-player {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px; // Ensure controls are always somewhat visible

  &:hover {
    .video-controls {
      opacity: 1;
    }
  }

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: contain; // Ensures the video scales down within its container without cropping
    background-color: transparent;
    cursor: pointer; // Indicate that the video itself is clickable
  }

  .big-play-button-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; // Allows click-through to video element

    .big-play-button {
      width: 80px;
      height: 80px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      pointer-events: auto; // Re-enables pointer events for the button itself
      transition: transform 0.2s ease, background-color 0.2s ease, opacity 0.3s ease; // Smooth opacity transition

      &:hover {
        transform: scale(1.1);
        background-color: rgba(0, 0, 0, 0.8);
      }

      svg {
        width: 40px;
        height: 40px;
        fill: white;
      }

      // State when video is playing
      &.is-playing {
        opacity: 0; // Hidden by default when playing
        transform: scale(0.8); // Slightly smaller

        &:hover {
          opacity: 1; // Show on hover even when playing
          transform: scale(0.9);
        }
      }
    }
  }

  // Show big play button when controls are visible (e.g., mouse over player)
  // This overrides the 'is-playing' opacity if controls are explicitly visible.
  &.controls-visible .big-play-button-container .big-play-button.is-playing {
    opacity: 0.7; // Slightly visible when controls are shown and playing
  }

  .video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 8px 12px; // Added padding for better spacing
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex; // Use flexbox for the controls row
    flex-direction: column; // Stack progress bar and controls row
    color: white; // Default text color for controls

    .progress-container {
      width: 100%;
      height: 20px; // Increased height for easier interaction
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      margin-bottom: 8px; // Space between progress bar and controls row

      .progress-bar {
        width: 100%;
        height: 4px; // Default height
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        position: relative;
        overflow: visible; // Allows scrubber and hover preview to be visible
        transition: height 0.2s ease; // Smooth height change

        &:hover {
          height: 6px; // Slightly thicker on hover
          .progress-fill::after {
            opacity: 1; // Show scrubber dot
          }
        }

        .progress-fill {
          height: 100%;
          background-color: var(--w-video-player-progress-color, #ff0000); // Customizable progress color
          border-radius: 2px;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(50%, -50%); // Centered on the end of the fill
            width: 12px;
            height: 12px;
            background-color: var(--w-video-player-progress-color, #ff0000);
            border-radius: 50%;
            opacity: 0; // Hidden by default
            transition: opacity 0.2s ease;
          }
        }

        .progress-hover {
          position: absolute;
          bottom: calc(100% + 5px); // Position above the progress bar
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.8);
          border-radius: 4px;
          padding: 4px 8px;
          pointer-events: none;
          white-space: nowrap; // Prevent time from wrapping
          color: white;
          font-size: 12px;
        }
      }
    }

    .controls-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%; // Ensure it takes full width

      .control-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0 4px;
        transition: transform 0.2s ease;
        flex-shrink: 0; // Prevent shrinking on smaller screens

        &:hover {
          transform: scale(1.1);
        }

        svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
      }

      .time-display {
        color: white;
        font-size: 14px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        flex-shrink: 0;

        .time-separator {
          margin: 0 4px;
          opacity: 0.7;
        }

        .framerate-display {
          margin-left: 8px;
          opacity: 0.7;
          font-size: 12px;
        }
      }

      .volume-control {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: auto; // Pushes volume and fullscreen to the right
        flex-shrink: 0;

        .volume-slider-container {
          width: 0; // Hidden by default
          overflow: hidden;
          transition: width 0.3s ease;
          display: flex;
          align-items: center;

          .volume-slider {
            width: 80px;
            margin: 0 8px;
            -webkit-appearance: none;
            appearance: none; // Standard for all browsers
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            outline: none;

            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 12px;
              height: 12px;
              background-color: white;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }

            &::-moz-range-thumb {
              width: 12px;
              height: 12px;
              background-color: white;
              border-radius: 50%;
              cursor: pointer;
              border: none;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }
          }
        }

        &:hover .volume-slider-container {
          width: 96px; // Show slider on hover
        }
      }
    }
  }
}

// Global class to ensure controls are visible, useful for editor
.custom-video-player.controls-visible .video-controls {
  opacity: 1;
}

// Media queries for responsiveness
@media (max-width: 768px) {
  .custom-video-player {
    .big-play-button-container .big-play-button {
      width: 60px;
      height: 60px;

      svg {
        width: 30px;
        height: 30px;
      }
    }

    .video-controls {
      padding: 8px 8px; // Adjust padding

      .controls-row {
        .time-display {
          font-size: 12px;
        }

        .volume-control:hover .volume-slider-container {
          width: 60px; // Smaller slider on hover for mobile
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .custom-video-player {
    .video-controls {
      .controls-row {
        // Only hide time display if necessary, framerate is valuable info
        // Consider keeping framerate if space allows, or re-evaluate layout
        .time-display {
          // display: none; // You can uncomment this if needed
        }
      }
    }
  }
}
</style>