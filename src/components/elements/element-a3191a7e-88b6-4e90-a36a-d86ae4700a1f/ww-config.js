export default {
  editor: {
    label: {
      en: 'Custom Video Player'
    },
    icon: 'video-camera'
  },
  // Added from your description
  name: 'custom-video-player',
  description: 'A modern, responsive video player with customizable controls, playback features, and styling options',
  keywords: ['video', 'player', 'media', 'controls', 'playback', 'fullscreen', 'volume', 'progress', 'framerate'],
  properties: {
    videoSrc: {
      label: {
        en: 'Video Source'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
    posterImage: {
      label: {
        en: 'Poster Image'
      },
      type: 'Image',
      section: 'settings',
      bindable: true,
      defaultValue: '',
    },
    autoplay: {
      label: {
        en: 'Autoplay'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    loop: {
      label: {
        en: 'Loop'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    startMuted: {
      label: {
        en: 'Start Muted'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    volume: {
      label: {
        en: 'Volume'
      },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 1,
      options: {
        min: 0,
        max: 1,
        step: 0.1
      },
    },
    playInline: {
      label: {
        en: 'Play Inline'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    },
    showBigPlayButton: {
      label: {
        en: 'Show Big Play Button'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    },
    autoHideControls: {
      label: {
        en: 'Auto-hide Controls'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    },
    showControls: {
      label: {
        en: 'Show Controls'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    }
  },
  triggerEvents: [
    {
      name: 'play',
      label: {
        en: 'On Play'
      },
      event: {
        currentTime: 0
      }
    },
    {
      name: 'pause',
      label: {
        en: 'On Pause'
      },
      event: {
        currentTime: 0
      }
    },
    {
      name: 'ended',
      label: {
        en: 'On End'
      },
      event: {}
    },
    {
      name: 'loaded',
      label: {
        en: 'On Loaded'
      },
      event: {
        duration: 0
      }
    },
    {
      name: 'volumeChange',
      label: {
        en: 'On Volume Change'
      },
      event: {
        volume: 0,
        muted: false
      }
    }
  ],
  actions: [
  {
    action: 'playVideo',
    label: {
      en: 'Play'
    }
  },
  {
    action: 'pauseVideo',
    label: {
      en: 'Pause'
    }
  },
  {
    action: 'togglePlay',
    label: {
      en: 'Toggle Play/Pause'
    }
  },
  {
    action: 'seekToTime',
    label: {
      en: 'Seek to Time'
    },
    args: [
      {
        name: 'time',
        type: 'number',
        label: {
          en: 'Time (seconds)'
        }
      }
    ]
  },
  {
    action: 'seekToPercentage',
    label: {
      en: 'Seek to Percentage'
    },
    args: [
      {
        name: 'percentage',
        type: 'number',
        label: {
          en: 'Percentage (0-100)'
        }
      }
    ]
  },
  {
    action: 'setVolume',
    label: {
      en: 'Set Volume'
    },
    args: [
      {
        name: 'volume',
        type: 'number',
        label: {
          en: 'Volume (0-1)'
        }
      }
    ]
  },
  {
    action: 'toggleMute',
    label: {
      en: 'Toggle Mute'
    }
  },
  {
    action: 'toggleFullscreen',
    label: {
      en: 'Toggle Fullscreen'
    }
  }
],
  // Correctly adding the variables section as per your documentation
  variables: [
    {
      name: 'currentTime',
      label: { en: 'Current Time (seconds)' },
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'duration',
      label: { en: 'Total Duration (seconds)' },
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'isPlaying',
      label: { en: 'Is Playing' },
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'framerate',
      label: { en: 'Framerate (fps)' },
      type: 'number',
      defaultValue: 0,
    },
  ],
};