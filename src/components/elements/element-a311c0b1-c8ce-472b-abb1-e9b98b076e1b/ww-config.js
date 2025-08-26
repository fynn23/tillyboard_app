export default {
    editor: {
        label: {
            en: 'Skeleton Loader'
        },
        icon: 'loader'
    },
    properties: {
        type: {
            label: { en: 'Type' },
            type: 'TextSelect',
            section: 'settings',
            bindable: true,
            defaultValue: 'text',
            options: {
                options: [
                    { value: 'text', label: 'Text' },
                    { value: 'circle', label: 'Circle' },
                    { value: 'rectangle', label: 'Rectangle' }
                ]
            },
        },
        width: {
            label: { en: 'Width' },
            type: 'Length',
            section: 'settings',
            bindable: true,
            defaultValue: '100%',
        },
        height: {
            label: { en: 'Height' },
            type: 'Length',
            section: 'settings',
            bindable: true,
            defaultValue: '16px',
        },
        borderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'settings',
            bindable: true,
            defaultValue: '4px',
        },
        backgroundColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#E2E8F0',
        },
        shimmerColor: {
            label: { en: 'Shimmer Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#EDF2F7',
        },
        animationDuration: {
            label: { en: 'Animation Duration (s)' },
            type: 'Number',
            section: 'settings',
            bindable: true,
            defaultValue: 1.5,
            options: {
                min: 0.1,
                max: 5,
                step: 0.1
            },
        },
        animationType: {
            label: { en: 'Animation Type' },
            type: 'TextSelect',
            section: 'settings',
            bindable: true,
            defaultValue: 'shimmer',
            options: {
                options: [
                    { value: 'shimmer', label: 'Shimmer' },
                    { value: 'pulse', label: 'Pulse' }
                ]
            },
        }
    }
};