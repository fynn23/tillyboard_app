export default {
  editor: {
    label: {
      en: 'Video Range Slider with Preview'
    },
    icon: 'video-camera'
  },
  properties: {
    videoUrl: {
      label: { en: 'Video URL' },
      type: 'Video',
      section: 'settings',
      bindable: true,
      defaultValue: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
    previewUrl: {
      label: { en: 'Preview Video URL (optional)' },
      type: 'Video',
      section: 'settings',
      bindable: true,
      defaultValue: null,
    },
    initialTime: {
      label: { en: 'Initial Time (seconds)' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 0,
      options: {
        min: 0,
        step: 0.1
      },
    },
    duration: {
      label: { en: 'Duration (seconds)' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 100,
      options: {
        min: 0,
        step: 0.1
      },
    },
    trackHeight: {
      label: { en: 'Track Height' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '6px',
    },
    trackColor: {
      label: { en: 'Track Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#cccccc',
    },
    progressColor: {
      label: { en: 'Progress Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ff0000',
    },
    thumbColor: {
      label: { en: 'Thumb Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
    },
    thumbSize: {
      label: { en: 'Thumb Size' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '16px',
    }
  },
  triggerEvents: [
    {
      name: 'change',
      label: { en: 'On time change' },
      event: { value: 0 }
    },
    {
      name: 'initValueChange',
      label: { en: 'On initial value change' },
      event: { value: 0 }
    }
  ],
  actions: [
    {
      action: 'setTime',
      label: { en: 'Set time' },
      args: [
        {
          name: 'time',
          type: 'number',
          label: { en: 'Time (seconds)' }
        }
      ]
    }
  ]
};