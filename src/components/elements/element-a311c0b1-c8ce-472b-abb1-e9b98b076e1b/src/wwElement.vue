<template>
    <div 
        class="skeleton-loader"
        :class="[type, animationType]"
        :style="skeletonStyle"
    >
        <div class="shimmer"></div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true }
    },
    setup(props) {
        const skeletonStyle = computed(() => ({
            width: props.content?.width || '100%',
            height: props.content?.height || '16px',
            borderRadius: props.content?.borderRadius || '4px',
            backgroundColor: props.content?.backgroundColor || '#E2E8F0',
            '--shimmer-color': props.content?.shimmerColor || '#EDF2F7',
            '--animation-duration': `${props.content?.animationDuration || 1.5}s`
        }));

        return {
            type: computed(() => props.content?.type || 'text'),
            animationType: computed(() => props.content?.animationType || 'shimmer'),
            skeletonStyle
        };
    }
};
</script>

<style lang="scss" scoped>
.skeleton-loader {
    position: relative;
    overflow: hidden;
    
    &.circle {
        border-radius: 50% !important;
    }

    &.shimmer {
        .shimmer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent 0%,
                var(--shimmer-color) 50%,
                transparent 100%
            );
            animation: shimmer var(--animation-duration) infinite linear;
        }
    }

    &.pulse {
        animation: pulse var(--animation-duration) infinite ease-in-out;
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>