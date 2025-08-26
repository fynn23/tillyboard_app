export default {
    editor: {
        label: {
            en: 'Canvas Board',
        },
        icon: 'photograph',
    },
    properties: {
        images: {
            label: { en: 'Images' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            defaultValue: [{
                id: 'default-image',
                url: 'https://cdn.weweb.app/public/images/placeholder.png',
                x: 50,
                y: 50
            }],
            options: {
                expandable: true,
                getItemLabel(item) {
                    return item?.id || 'Image';
                },
                item: {
                    type: 'Object',
                    defaultValue: {
                        id: '',
                        url: '',
                        x: 0,
                        y: 0
                    },
                    options: {
                        item: {
                            id: {
                                label: 'ID',
                                type: 'Text',
                                options: { placeholder: 'Image ID' }
                            },
                            url: {
                                label: 'URL',
                                type: 'Text',
                                options: { placeholder: 'Image URL' }
                            },
                            x: {
                                label: 'X Position',
                                type: 'Number',
                                options: { min: -10000, max: 10000 }
                            },
                            y: {
                                label: 'Y Position',
                                type: 'Number',
                                options: { min: -10000, max: 10000 }
                            }
                        }
                    }
                }
            },
        },
        minZoom: {
            label: { en: 'Minimum Zoom' },
            type: 'Number',
            section: 'settings',
            bindable: true,
            defaultValue: 0.1,
            options: {
                min: 0.1,
                max: 1,
                step: 0.1
            },
        },
        maxZoom: {
            label: { en: 'Maximum Zoom' },
            type: 'Number',
            section: 'settings',
            bindable: true,
            defaultValue: 3,
            options: {
                min: 1,
                max: 10,
                step: 0.5
            },
        },
        initialZoom: {
            label: { en: 'Initial Zoom' },
            type: 'Number',
            section: 'settings',
            bindable: true,
            defaultValue: 1,
            options: {
                min: 0.1,
                max: 10,
                step: 0.1
            },
        }
    },
    triggerEvents: [
        {
            name: 'imageAdded',
            label: { en: 'On image added' },
            event: { value: { id: '', url: '', x: 0, y: 0 } }
        },
        {
            name: 'imageRemoved',
            label: { en: 'On image removed' },
            event: { value: { id: '' } }
        },
        {
            name: 'positionChanged',
            label: { en: 'On position changed' },
            event: { value: { id: '', x: 0, y: 0 } }
        },
        {
            name: 'zoomChanged',
            label: { en: 'On zoom changed' },
            event: { value: 1 }
        }
    ],
    actions: [
        {
            name: 'addImage',
            label: { en: 'Add image' },
            args: [
                {
                    name: 'url',
                    type: 'string',
                    label: { en: 'Image URL' }
                },
                {
                    name: 'x',
                    type: 'number',
                    label: { en: 'X Position' }
                },
                {
                    name: 'y',
                    type: 'number',
                    label: { en: 'Y Position' }
                }
            ]
        },
        {
            name: 'removeImage',
            label: { en: 'Remove image' },
            args: [
                {
                    name: 'id',
                    type: 'string',
                    label: { en: 'Image ID' }
                }
            ]
        },
        {
            name: 'setZoom',
            label: { en: 'Set zoom' },
            args: [
                {
                    name: 'level',
                    type: 'number',
                    label: { en: 'Zoom level' }
                }
            ]
        },
        {
            name: 'resetView',
            label: { en: 'Reset view' }
        }
    ]
};