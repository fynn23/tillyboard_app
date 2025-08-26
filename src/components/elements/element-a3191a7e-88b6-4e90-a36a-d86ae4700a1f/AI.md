---
name: custom-video-player
description: A modern, responsive video player with customizable controls, playback features, and styling options
keywords: video, player, media, controls, playback, fullscreen, volume, progress, framerate
---

#### Custom Video Player

Properties:
- `videoSrc`: `string` - URL of the video file to play (MP4, WebM, etc.). Default: sample video URL
- `posterImage`: `string` - URL of the image to display before video playback. Default: `''`
- `autoplay`: `boolean` - Automatically start playing when loaded. Default: `false`
- `loop`: `boolean` - Automatically restart video when it ends. Default: `false`
- `startMuted`: `boolean` - Start with audio muted. Default: `false`
- `volume`: `number` - Initial volume level (0-1). Default: `1`
- `playInline`: `boolean` - Play inline on mobile devices instead of fullscreen. Default: `true`
- `showBigPlayButton`: `boolean` - Show large play button in center of video. Default: `true`
- `autoHideControls`: `boolean` - Automatically hide controls during playback. Default: `true`
- `showControls`: `boolean` - Show or hide video controls completely. Default: `true`

Events:
- `play`: {currentTime: number} - Triggered when video starts playing
- `pause`: {currentTime: number} - Triggered when video is paused
- `ended`: {} - Triggered when video playback completes
- `loaded`: {duration: number} - Triggered when video metadata is loaded, includes total video duration
- `volumeChange`: {volume: number, muted: boolean} - Triggered when volume changes or mute state changes

Actions:
- `playVideo`: Play the video
- `pauseVideo`: Pause the video
- `togglePlay`: Toggle between play and pause states
- `seekToTime`: Jump to specific time. Args: time (seconds)
- `seekToPercentage`: Jump to percentage position. Args: percentage (0-100)
- `setVolume`: Set volume level. Args: volume (0-1)
- `toggleMute`: Toggle mute state

Variables:
- `currentTime`: number - Current playback position in seconds
- `duration`: number - Total video duration in seconds
- `isPlaying`: boolean - Whether video is currently playing
- `framerate`: number - Detected framerate of the video in frames per second (fps)

Special features:
- Responsive design that adapts to different screen sizes
- Animated controls with hover effects for better user experience
- Progress bar with hover preview
- Volume slider with intuitive controls
- Fullscreen support with proper browser compatibility
- Option to completely hide controls
- Option to hide the big play button
- Customizable appearance through CSS variables
- Framerate detection and display