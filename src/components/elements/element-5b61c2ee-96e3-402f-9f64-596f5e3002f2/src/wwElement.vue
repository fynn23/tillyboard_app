<template>
<draggable
v-model="internalItems"
:item-key="itemKey"
:clone="clone"
:group="group"
:sort="sortable"
:animation="200"
:handle="handle?.length ? `.${handle}` : null"
:disabled="isEditing || isReadonly"
ghost-class="ghost"
@change="onChange"
@start="onStart"
@end="onEnd"
@choose="onChoose"
:move="onMove"
>
<template #header>
<wwLayout path="headerElement"></wwLayout>
</template>
<template #item="{ element, index: itemIndex }">
<div 
class="draggable-item"
:class="{ 'draggable-item--disabled': !isAllowed(element) }"
:data-index="itemIndex"
:data-value="getItemValue(element)"
>
<wwLayoutItemContext
:index="itemIndex"
:item="null"
is-repeat
:data="element"
:repeated-items="internalItems"
>
<wwLayout path="itemElement"></wwLayout>
</wwLayoutItemContext>
</div>
</template>
<template #footer>
<wwLayout path="footerElement"></wwLayout>
</template>
</draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
components: {
draggable,
},
inject: {
customHandler: { defaultValue: null },
customDragHandler: { defaultValue: null },
},
props: {
wwElementState: { type: Object, required: true },
content: { type: Object, required: true },
uid: { type: String, required: true },
},
emits: ["trigger-event"],
setup(props) {
const { value: isDragging, setValue: setDrag } = wwLib.wwVariable.useComponentVariable({
uid: props.uid,
name: "isDragging",
type: "boolean",
defaultValue: false,
readonly: true,
});
return { isDragging, setDrag };
},
data: () => ({
internalItems: [],
draggedItem: null,
}),
methods: {
// Safe clone function to prevent __draggable_context errors
clone(el) {
// Create a clean copy without __draggable_context
if (el && typeof el === 'object') {
const cleanCopy = { ...el };
// Remove any internal draggable properties
delete cleanCopy.__draggable_context;
return cleanCopy;
}
return el;
},
onChange(change) {
if (this.customHandler) {
this.customHandler(change, { ...this.wwElementState.props, updatedStackItems: this.internalItems });
}
if (change.moved) {
this.$emit("trigger-event", {
name: "item:moved",
event: {
item: change.moved.element,
oldIndex: change.moved.oldIndex,
newIndex: change.moved.newIndex,
updatedList: this.internalItems,
},
});
}

if (change.added) {
this.$emit("trigger-event", {
name: "item:added",
event: {
item: change.added.element,
newIndex: change.added.newIndex,
updatedList: this.internalItems,
},
});
}

if (change.removed) {
this.$emit("trigger-event", {
name: "item:removed",
event: {
item: change.removed.element,
oldIndex: change.removed.oldIndex,
updatedList: this.internalItems,
},
});
}
},
getItemValue(item) {
if (!item) return '';
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
return item[allowKey] || '';
},
isAllowed(item) {
if (!item) return true;

const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
const allowValuesStr = this.wwElementState.props?.allowValues || this.content?.allowValues || "";

if (!allowValuesStr) return true; // If no restriction values are set, allow all

const allowValues = allowValuesStr.split(',').map(val => val.trim());
return allowValues.includes(String(item[allowKey]));
},
setupPreDragCheck() {
if (this.$el) {
// Remove any existing listeners to prevent duplicates
this.$el.removeEventListener('pointerdown', this.handlePreDragCheck, { passive: false });
this.$el.removeEventListener('mousedown', this.handlePreDragCheck, { passive: false });
this.$el.removeEventListener('touchstart', this.handlePreDragCheck, { passive: false });

// Add new listeners
this.$el.addEventListener('pointerdown', this.handlePreDragCheck, { passive: false });
this.$el.addEventListener('mousedown', this.handlePreDragCheck, { passive: false });
this.$el.addEventListener('touchstart', this.handlePreDragCheck, { passive: false });
}
},
handlePreDragCheck(evt) {
// Find the closest draggable item
const itemEl = evt.target?.closest('.draggable-item');
if (!itemEl) return;

// Find the index of the item
const itemElements = Array.from(this.$el.querySelectorAll('.draggable-item'));
const index = itemElements.indexOf(itemEl);
if (index === -1) return;

// Get the item data
const item = this.internalItems[index];
if (!item) return;

// Check if the item is allowed to be dragged
if (!this.isAllowed(item)) {
evt.preventDefault();
evt.stopPropagation();

// Emit rejection event
this.$emit("trigger-event", {
name: "item:rejected",
event: {
item: item,
reason: "value-restricted",
},
});
}
},
onStart(evt) {
if (!evt) return;
const item = this.internalItems[evt.oldIndex];
if (!this.isAllowed(item)) {
evt.preventDefault();
return false;
}
this.draggedItem = item;
this.setDrag(true);
},
onEnd() {
this.draggedItem = null;
this.setDrag(false);
},
onChoose(evt) {
if (!evt) return;
const item = this.internalItems[evt.oldIndex];
if (!this.isAllowed(item)) {
evt.preventDefault();
return false;
}
},
onMove(evt) {
if (!evt) return true;

// Safely access the dragged item
let draggedItem = null;
try {
// First try to get from our stored draggedItem
if (this.draggedItem) {
draggedItem = this.draggedItem;
}
// Then try from draggedContext
else if (evt.draggedContext && evt.draggedContext.element) {
draggedItem = evt.draggedContext.element;
}
// Try to get from the DOM element
else if (evt.draggedEl && evt.draggedEl.dataset && evt.draggedEl.dataset.index) {
const sourceIndex = parseInt(evt.draggedEl.dataset.index, 10);
if (!isNaN(sourceIndex) && Array.isArray(evt.from.list) && sourceIndex >= 0 && sourceIndex < evt.from.list.length) {
draggedItem = evt.from.list[sourceIndex];
}
}
} catch (error) {
console.warn("Error accessing dragged item:", error);
}

// Safely access the target container's allowed values
let targetAllowValues = [];
try {
// Get the target container's allowValues
const targetEl = evt.to && evt.to.el ? evt.to.el.closest('[data-element-id]') : null;
if (targetEl) {
const targetComponent = window.wwLib.getElement(targetEl.dataset.elementId);
if (targetComponent) {
const allowKey = targetComponent.content?.allowKey || "type";
const allowValuesStr = targetComponent.content?.allowValues || "";
if (allowValuesStr) {
targetAllowValues = allowValuesStr.split(',').map(val => val.trim());
}
}
}
} catch (error) {
console.warn("Error accessing target container's allowed values:", error);
}

// Check if the dragged item is allowed in the target container
if (draggedItem && targetAllowValues.length > 0) {
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
const itemValue = String(draggedItem[allowKey] || '');


if (!targetAllowValues.includes(itemValue)) {
// Emit rejection event
this.$emit("trigger-event", {
name: "item:rejected",
event: {
item: draggedItem,
reason: "target-container-restriction",
},
});
return false;
}
}

// If we couldn't determine or there are no restrictions, allow the move
return true;
},
},
computed: {
isEditing() {
// eslint-disable-next-line no-unreachable
return false;
},
items() {
const data = this.wwElementState.props?.items ? this.wwElementState.props.items : this.content?.items;
const items = wwLib.wwUtils.getDataFromCollection(data);
if (!Array.isArray(items)) return [];
return items;
},
group() {
const groupValue = this.wwElementState.props?.group ? this.wwElementState.props.group : this.content?.group;

// If it's a string, convert to object with name and put function
if (typeof groupValue === 'string') {
return {
name: groupValue,
put: (to, from, dragEl, evt) => {
try {
// Get the dragged item value
let draggedItemValue = '';


// Try to get value from data attribute first (most reliable)
if (dragEl && dragEl.dataset && dragEl.dataset.value) {
draggedItemValue = dragEl.dataset.value;
}
// Try to get from the dragged element
else if (dragEl && dragEl.dataset && dragEl.dataset.index) {
const sourceIndex = parseInt(dragEl.dataset.index, 10);
if (!isNaN(sourceIndex) && Array.isArray(from.list) && sourceIndex >= 0 && sourceIndex < from.list.length) {
const item = from.list[sourceIndex];
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
draggedItemValue = String(item[allowKey] || '');
}
}
// Try to get from __draggable_context
else if (dragEl && dragEl.__draggable_context && dragEl.__draggable_context.element) {
const item = dragEl.__draggable_context.element;
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
draggedItemValue = String(item[allowKey] || '');
}

// Get this container's allowed values
const allowValuesStr = this.wwElementState.props?.allowValues || this.content?.allowValues || "";
if (!allowValuesStr) return true; // If no restriction values are set, allow all

const allowValues = allowValuesStr.split(',').map(val => val.trim());
return allowValues.includes(draggedItemValue);
} catch (error) {
console.warn("Error in group.put function:", error);
return true; // Allow by default if we can't determine
}
}
};
}

// If it's already an object, add the put function
if (typeof groupValue === 'object' && groupValue !== null) {
return {
...groupValue,
put: (to, from, dragEl, evt) => {
try {
// Get the dragged item value
let draggedItemValue = '';


// Try to get value from data attribute first (most reliable)
if (dragEl && dragEl.dataset && dragEl.dataset.value) {
draggedItemValue = dragEl.dataset.value;
}
// Try to get from the dragged element
else if (dragEl && dragEl.dataset && dragEl.dataset.index) {
const sourceIndex = parseInt(dragEl.dataset.index, 10);
if (!isNaN(sourceIndex) && Array.isArray(from.list) && sourceIndex >= 0 && sourceIndex < from.list.length) {
const item = from.list[sourceIndex];
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
draggedItemValue = String(item[allowKey] || '');
}
}
// Try to get from __draggable_context
else if (dragEl && dragEl.__draggable_context && dragEl.__draggable_context.element) {
const item = dragEl.__draggable_context.element;
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
draggedItemValue = String(item[allowKey] || '');
}

// Get this container's allowed values
const allowValuesStr = this.wwElementState.props?.allowValues || this.content?.allowValues || "";
if (!allowValuesStr) return true; // If no restriction values are set, allow all

const allowValues = allowValuesStr.split(',').map(val => val.trim());
return allowValues.includes(draggedItemValue);
} catch (error) {
console.warn("Error in group.put function:", error);
return true; // Allow by default if we can't determine
}
}
};
}

// Default fallback
return {
name: 'common',
put: (to, from, dragEl, evt) => {
try {
// Get the dragged item value
let draggedItemValue = '';


// Try to get value from data attribute first (most reliable)
if (dragEl && dragEl.dataset && dragEl.dataset.value) {
draggedItemValue = dragEl.dataset.value;
}
// Try to get from the dragged element
else if (dragEl && dragEl.dataset && dragEl.dataset.index) {
const sourceIndex = parseInt(dragEl.dataset.index, 10);
if (!isNaN(sourceIndex) && Array.isArray(from.list) && sourceIndex >= 0 && sourceIndex < from.list.length) {
const item = from.list[sourceIndex];
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
draggedItemValue = String(item[allowKey] || '');
}
}
// Try to get from __draggable_context
else if (dragEl && dragEl.__draggable_context && dragEl.__draggable_context.element) {
const item = dragEl.__draggable_context.element;
const allowKey = this.wwElementState.props?.allowKey || this.content?.allowKey || "type";
draggedItemValue = String(item[allowKey] || '');
}

// Get this container's allowed values
const allowValuesStr = this.wwElementState.props?.allowValues || this.content?.allowValues || "";
if (!allowValuesStr) return true; // If no restriction values are set, allow all

const allowValues = allowValuesStr.split(',').map(val => val.trim());
return allowValues.includes(draggedItemValue);
} catch (error) {
console.warn("Error in group.put function:", error);
return true; // Allow by default if we can't determine
}
}
};
},
sortable() {
return this.wwElementState.props?.sortable !== undefined ? this.wwElementState.props.sortable : this.content?.sortable;
},
itemKey() {
return this.wwElementState.props?.itemKey || "id";
},
handle() {
return this.wwElementState.props?.handle?.length
? this.wwElementState.props.handle
: this.content?.customDragHandle
? this.content?.handleClass || "draggable"
: null;
},
isReadonly() {
// Ensure to return a boolean as vuedraggable interpret undefined as true
return !!(this.wwElementState.props?.readonly || this.content?.readonly);
},
},
watch: {
items: {
immediate: true,
deep: true,
handler: function (value) {
this.internalItems = Array.isArray(value) ? [...value] : [];
},
},
isDragging(value) {
if (this.customDragHandler) {
this.customDragHandler(value, { ...this.wwElementState.props });
}
},
isReadonly: {
immediate: true,
handler(value) {
if (value) {
this.$emit("add-state", "readonly");
} else {
this.$emit("remove-state", "readonly");
}
},
},
'content.allowKey': function() {
this.$nextTick(() => {
// Force re-render to update disabled state visuals
this.internalItems = [...this.internalItems];
});
},
'content.allowValues': function() {
this.$nextTick(() => {
// Force re-render to update disabled state visuals
this.internalItems = [...this.internalItems];
});
},
'wwElementState.props.allowKey': function() {
this.$nextTick(() => {
// Force re-render to update disabled state visuals
this.internalItems = [...this.internalItems];
});
},
'wwElementState.props.allowValues': function() {
this.$nextTick(() => {
// Force re-render to update disabled state visuals
this.internalItems = [...this.internalItems];
});
},
},
mounted() {
this.setupPreDragCheck();
},
beforeUnmount() {
if (this.$el) {
this.$el.removeEventListener('pointerdown', this.handlePreDragCheck);
this.$el.removeEventListener('mousedown', this.handlePreDragCheck);
this.$el.removeEventListener('touchstart', this.handlePreDragCheck);
}
},
};
</script>

<style scoped>
/** FIX POINTER-EVENTS: ALL BREAKING DRAGGABLE ON MOBILE/TABLET (TOUCH MODE) */
.draggable-item :deep(.ww-layout) {
pointer-events: unset !important;
}
.draggable-item :deep(* > .ww-element) {
pointer-events: unset !important;
}
.draggable-item :deep(** > .ww-element) {
pointer-events: unset !important;
}
.ghost {
outline: 2px dashed #2B67F5;
outline-offset: 2px;
border-radius: 16px;
background-color: transparent;
margin: 10px 0;
}

/* Styling for disabled items */
.draggable-item--disabled {
cursor: not-allowed !important;
opacity: 0.7 !important;
background-color: #f0f0f0 !important;
color: #888 !important;
}

.draggable-item--disabled :deep(*) {
pointer-events: none !important;
}

/* Add visual feedback for invalid drop targets */
.draggable-item.invalid-target {
border: 2px dashed #ff4d4f !important;
background-color: rgba(255, 77, 79, 0.1) !important;
}
</style>