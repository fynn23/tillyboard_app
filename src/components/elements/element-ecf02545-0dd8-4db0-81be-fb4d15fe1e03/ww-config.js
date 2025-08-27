export default {
    editor: {
        label: {
            en: 'Skeleton Shape'
        },
        icon: 'loader'
    },
    properties: {
        design: {
            label: { en: 'Design' },
            type: 'TextRadioGroup',
            section: 'settings',
            bindable: true,
            defaultValue: 'simple',
            options: {
                choices: [
                    { value: 'simple', title: 'Simple', icon: 'template' },
                    { value: 'nested', title: 'Nested', icon: 'collection' },
                    { value: 'split', title: 'Split', icon: 'view-grid' },
                    { value: 'circles', title: 'Circles', icon: 'dots-horizontal' }
                ]
            },
        },
        shimmerColor: {
            label: { en: 'Shimmer Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#f8fafc',
        },
        baseColor: {
            label: { en: 'Base Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#e2e8f0',
        },
        width: {
            label: { en: 'Width' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '100%',
        },
        height: {
            label: { en: 'Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '200px',
        },
        borderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '4px',
        },
        animationDuration: {
            label: { en: 'Animation Duration' },
            type: 'Number',
            section: 'settings',
            bindable: true,
            defaultValue: 1.5,
            options: {
                min: 0.5,
                max: 5,
                step: 0.1
            },
        }
    }
};