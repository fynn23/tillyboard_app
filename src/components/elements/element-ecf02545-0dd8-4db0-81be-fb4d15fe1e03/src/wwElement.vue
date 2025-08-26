<template>
    <div 
        class="skeleton-shape"
        :class="design"
        :style="containerStyle"
    >
        <template v-if="design === 'nested'">
            <div class="skeleton-inner top"></div>
            <div class="skeleton-inner bottom">
                <div class="skeleton-inner-item"></div>
                <div class="skeleton-inner-item"></div>
            </div>
        </template>
        <template v-else-if="design === 'split'">
            <div class="skeleton-split left"></div>
            <div class="skeleton-split right"></div>
        </template>
        <template v-else-if="design === 'circles'">
            <div class="skeleton-circle"></div>
            <div class="skeleton-circle"></div>
            <div class="skeleton-circle"></div>
        </template>
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
        const containerStyle = computed(() => ({
            width: props.content?.width || '100%',
            height: props.content?.height || '200px',
            borderRadius: props.content?.borderRadius || '4px',
            '--skeleton-base': props.content?.baseColor || '#e2e8f0',
            '--skeleton-shimmer': props.content?.shimmerColor || '#f8fafc',
            '--animation-duration': `${props.content?.animationDuration || 1.5}s`
        }));

        return {
            design: computed(() => props.content?.design || 'simple'),
            containerStyle
        };
    }
};
</script>

<style lang="scss" scoped>
.skeleton-shape {
    position: relative;
    overflow: hidden;
    background: var(--skeleton-base);

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            var(--skeleton-shimmer) 20%,
            var(--skeleton-shimmer) 60%,
            rgba(255, 255, 255, 0)
        );
        animation: shimmer var(--animation-duration) infinite;
    }

    &.nested {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;

        .skeleton-inner {
            background: var(--skeleton-base);
            border-radius: inherit;

            &.top {
                height: 40%;
            }

            &.bottom {
                height: 60%;
                display: flex;
                gap: 8px;

                .skeleton-inner-item {
                    flex: 1;
                    background: var(--skeleton-base);
                    border-radius: inherit;
                }
            }
        }
    }

    &.split {
        display: flex;
        gap: 8px;
        padding: 12px;

        .skeleton-split {
            flex: 1;
            background: var(--skeleton-base);
            border-radius: inherit;
        }
    }

    &.circles {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 12px;

        .skeleton-circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--skeleton-base);
        }
    }
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>