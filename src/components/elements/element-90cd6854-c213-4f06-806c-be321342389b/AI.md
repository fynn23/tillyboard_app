---
name: video-range-slider-preview
description: A customizable video range slider with hover preview functionality for controlling video playback position
keywords: video, slider, range, preview, player, control, scrubber, timeline
---

#### Video Range Slider with Preview

***Purpose:***
A specialized range slider component designed specifically for video playback control, featuring a hover preview that shows the video content at the hovered position.

***Features:***
- Interactive slider for controlling video playback position
- Mini video preview that appears when hovering over the slider
- Fully customizable appearance (track height, colors, thumb size)
- Connects to any video source through binding
- Exposes current time as an internal variable for integration with video players

***Properties:***
- videoUrl: string - The URL of the video to control with this slider
- previewUrl: string|null - Optional separate video URL for the preview (defaults to main videoUrl if not provided)
- initialTime: number - The initial position of the slider in seconds
- duration: number - The total duration of the video in seconds
- trackHeight: string - CSS length value for the height/thickness of the slider track
- trackColor: string - Color of the slider track (background)
- progressColor: string - Color of the progress bar (filled part of the slider)
- thumbColor: string - Color of the slider thumb (handle)
- thumbSize: string - CSS length value for the size of the slider thumb

***Events:***
- change: Triggered when the user moves the slider. Payload: { value: currentTimeInSeconds }
- initValueChange: Triggered when the initialTime property changes. Payload: { value: newTimeInSeconds }

***Exposed Actions:***
- `setTime`: Sets the current time position of the slider. Args: time (number) - Time in seconds

***Exposed Variables:***
- currentTime: The current position of the slider in seconds. (path: variables['current_element_uid-currentTime'])

***Notes:***
- This component does not include a video player - it's designed to be used alongside a separate video player component
- Connect this slider to a video player by binding the player's currentTime to this component's exposed currentTime variable
- For the preview to work correctly, the video must be properly loaded and accessible
- The preview video can be the same as the main video or a lower-resolution version for better performance