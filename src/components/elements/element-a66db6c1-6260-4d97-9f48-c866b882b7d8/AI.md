---
name: interactive-canvas
description: A versatile canvas for creating visual layouts with images, text, and color fields that snap to a customizable grid.
keywords: canvas, image upload, drag and drop, interactive, grid layout, text editor, color fields, collage, mood board
---

#### Interactive Canvas

***Purpose:***
Creates a flexible canvas where users can upload images, add text, and create color fields - all with grid snapping capabilities. Perfect for creating collages, mood boards, or visual layouts without coding.

***Features:***
- Drag-and-drop image upload from user's device
- Add text elements with customizable properties
- Add color fields with adjustable dimensions
- Grid snapping system for precise positioning
- Resize text and color elements by dragging
- Double-click to edit text content
- Intuitive item positioning through drag-and-drop
- Item selection with visual feedback
- Individual item deletion and full canvas reset
- Responsive design that adapts to different screen sizes

***Properties:***
- uploadText: string - Main text displayed in the upload zone ("Drop images here")
- uploadSubtext: string - Secondary instruction text ("or drag and drop files")
- resetButtonText: string - Text for the reset button ("Reset Canvas")
- deleteButtonText: string - Tooltip for item delete buttons ("Delete")
- snapToGrid: boolean - Whether items should snap to grid positions (true)
- showGrid: boolean - Whether to display the grid lines (true)
- gridSize: number - Size of grid cells in pixels (50)
- defaultColorField: string - Default color for new color fields ("#3498db")
- backgroundColor: string - Canvas background color ("#f5f5f5")
- backgroundPattern: string|null - Optional URL for a background pattern image
- minHeight: string - Minimum height of the canvas ("300px")
- borderRadius: string - Border radius for canvas corners ("8px")
- showBorder: boolean - Whether to display a border around the canvas (true)
- borderColor: string - Color of the canvas border when enabled ("#ddd")

***Events:***
- upload: Triggered when a new image is uploaded. Payload: { item: {id, type, src, x, y, width} }
- delete: Triggered when an item is deleted. Payload: { item: {id, type, ...} }
- move: Triggered when an item position changes. Payload: { item: {id, type, ...} }
- resize: Triggered when an item is resized. Payload: { item: {id, type, ...} }
- textEdit: Triggered when text content is edited. Payload: { item: {id, type, text, ...} }
- addText: Triggered when a text element is added. Payload: { item: {id, type, text, ...} }
- addColorField: Triggered when a color field is added. Payload: { item: {id, type, color, ...} }
- change: Triggered on any canvas state change. Payload: { items: [{id, type, ...}, ...] }
- reset: Triggered when the canvas is cleared. No payload.

***Exposed Actions:***
- `addImage`: Adds an image to the canvas from a URL. Args: imageUrl (string)
- `addText`: Adds a new text element to the canvas. No arguments.
- `addColorField`: Adds a new color field to the canvas. No arguments.
- `resetCanvas`: Clears all items from the canvas. No arguments.

***Exposed Variables:***
- items: Array of all items on the canvas with their positions, dimensions and properties. (path: variables['current_element_uid-items'])

***Notes:***
- Images maintain their aspect ratio when added to the canvas
- Text elements can be edited by double-clicking
- Color fields and text elements can be resized by dragging the handle in the bottom-right corner
- Grid snapping can be enabled/disabled and grid size is customizable
- Selected items appear with a subtle highlight and elevation effect
- The component automatically adapts to container width
- For security reasons, the component only accepts image file types during drag-and-drop
- In edit mode, drag-and-drop functionality is disabled to allow for component positioning