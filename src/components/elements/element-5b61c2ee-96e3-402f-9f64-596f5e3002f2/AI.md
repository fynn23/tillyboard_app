---
name: draggable-row
description: A draggable component that allows for sorting, adding, and removing items with restriction capabilities based on item properties.
keywords: draggable, sortable, list, stack, drag-and-drop, restricted, value-matching
---

#### Draggable Row

***Purpose:***
A flexible draggable component that allows users to create sortable lists with the ability to restrict which items can be dragged based on their properties and ensure items can only be dropped in compatible lists.

***Features:***
- Drag and drop functionality for list items
- Group support for dragging between different lists
- Value-based validation for cross-list drag operations
- Customizable drag handles
- Restriction system to allow only specific items to be dragged
- Visual feedback for non-draggable items (grayed out)
- Read-only mode support

***Properties:***
- group: string - Defines which group this draggable belongs to (for dragging between lists)
- items: array - The array of items to display and make draggable
- sortable: boolean - Whether items can be sorted within the list
- readonly: boolean - Disables all drag functionality when true
- customDragHandle: boolean - When true, only elements with the specified class can be used to drag items
- handleClass: string - The class name to use for drag handles (default: "draggable")
- allowKey: string - The key in item objects to check for allowed values (default: "type")
- allowValues: string - Comma-separated list of values that are allowed for dragging (e.g. "shot,setup")

***Slots:***
- headerElement: (element) ww-flexbox - Content to display at the top of the list
- itemElement: (element) ww-flexbox - Template for each item in the list
- footerElement: (element) ww-flexbox - Content to display at the bottom of the list

***Events:***
- item:moved - Triggered when an item is moved within the list. Payload: { item, oldIndex, newIndex, updatedList }
- item:added - Triggered when an item is added to the list. Payload: { item, newIndex, updatedList }
- item:removed - Triggered when an item is removed from the list. Payload: { item, oldIndex, updatedList }
- item:rejected - Triggered when a drag attempt is rejected due to restrictions. Payload: { item, reason }

***Exposed Variables:***
- isDragging: boolean - READ ONLY - Indicates whether an item is currently being dragged

***Notes:***
- To restrict which items can be dragged, set the allowKey to the property name in your items (e.g., "type") and allowValues to a comma-separated list of allowed values (e.g., "shot,setup")
- Items that don't match the allowed values will be visually indicated in gray and cannot be dragged
- When using multiple lists with the same group, items can only be dropped in lists that accept their value type
- For cross-list drag operations, both the source and target lists must have compatible allowValues
- The component includes robust error handling to prevent issues with the __draggable_context property
- To set up value-based restrictions between lists:
  1. Give all related lists the same group name
  2. Set the allowKey to the same property name in all lists (e.g., "type")
  3. For each list, set allowValues to only include the values you want that list to accept