---
name: folder-structure
description: A customizable folder structure component with drag and drop functionality for organizing files and folders in a tree view
keywords: folder, file, tree, structure, organization, drag and drop, hierarchy, directory
---

#### Folder Structure Component

Properties:
- `initialData`: `string | object` - JSON string or object representing the initial folder structure. Default: `[{name: "Documents", id: "folder-1", children: [...]}]`
- `defaultExpanded`: `boolean` - Whether folders should be expanded by default. Default: `false`
- `showControls`: `boolean` - Whether to show the add folder/file buttons. Default: `true`
- `showIds`: `boolean` - Whether to show node IDs next to names. Default: `false`
- `defaultFolderName`: `string` - The default name for new folders. Default: `"New Folder"`
- `defaultFileName`: `string` - The default name for new files. Default: `"New File"`
- `folderIcon`: `string` - The icon to use for folders. Default: `"📂"`
- `fileIcon`: `string` - The icon to use for files. Default: `"📄"`
- `addFolderIcon`: `string` - The icon to use for the add folder action. Default: `"📂"`
- `addFileIcon`: `string` - The icon to use for the add file action. Default: `"📄"`
- `editIcon`: `string` - The icon to use for the edit action. Default: `"✏️"`
- `deleteIcon`: `string` - The icon to use for the delete action. Default: `"🗑️"`

Events:
- `nodeClick`: {value: node} - Triggered when a node is clicked
- `nodeAdded`: {value: {parentNode, node}} - Triggered when a new node is added
- `nodeRenamed`: {value: {node, oldName, newName}} - Triggered when a node is renamed
- `nodeDeleted`: {value: node} - Triggered when a node is deleted
- `nodeMoved`: {value: {node, targetNode, placement}} - Triggered when a node is moved via drag and drop
- `treeUpdated`: {value: treeStructure} - Triggered whenever the tree structure changes

Actions:
- `expandAll`: Expands all folders in the tree
- `collapseAll`: Collapses all folders in the tree
- `addRootNode`: Adds a new folder at the root level
- `addRootLeaf`: Adds a new file at the root level
- `getTreeData`: Returns the current tree data structure as a plain object

Variables:
- `selectedNode`: object - The currently selected node
- `treeStructure`: object - The current tree structure as a plain object

Special features:
- Enhanced drag and drop functionality with visual cues for reorganizing files and folders
- Visual instructions to help users understand the drag and drop capabilities
- Double-click on node names to edit them
- Context menu actions for adding, editing, and deleting nodes
- Customizable icons for all node types and actions
- Ability to disable specific actions on specific nodes
- Improved visual styling to better represent a traditional file explorer interface