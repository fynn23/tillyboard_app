<template>
    <draggable
        v-model="items"
        :itemKey="getItemKey"
        :disabled="isEditing"
        ghost-class="ghost"
        :animation="200"
        :style="{ ...$attrs.style, ...layoutStyle }"
        v-bind="options"
    >
        <template #item="{ element, index }">
            <div>
                <wwLayoutItemContext is-repeat :data="element" :item="null" :index="index">
                    <wwElement v-bind="content.itemContainer" />
                </wwLayoutItemContext>
            </div>
        </template>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
    components: { draggable },
    props: {
        content: { type: Object, required: true },
        wwEditorState: { type: Object, default: null },
    },
    emits: ["trigger-event"],
    setup() {
        return { layoutStyle: wwLib.wwElement.useLayoutStyle() };
    },
    computed: {
        items: {
            get() {
                return wwLib.wwUtils.getDataFromCollection(this.content.data) || [];
            },
            set(value) {
                this.$emit("trigger-event", { name: "update:list", event: { value } });
            },
        },
        isEditing() {
            return this.wwEditorState?.isEditing;
        },
        options() {
            const options = {};
            if (this.content.handle?.length) {
                options.handle = `.${this.content.handle}`;
            }
            if (this.content.group) {
                options.group = this.content.group;
            }

            return options;
        },
    },
    methods: {
        getItemKey(item) {
            wwLib.resolveObjectPropertyPath(item, this.content.idPath || "id");
        },

    },
};
</script>

<style scoped>
.ghost {
    outline: 2px dashed #2B67F5;
    outline-offset: 4px;
    border-radius: 16px;
    background-color: transparent;
    margin: 5px 0;
}

</style>
