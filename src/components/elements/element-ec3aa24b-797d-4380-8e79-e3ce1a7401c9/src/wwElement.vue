<template>
  <div class="folder-structure">
    <div class="folder-structure__actions" v-if="showControls">
      <button class="folder-structure__button" @click="addRootNode">
        <span class="folder-structure__button-icon">{{ content?.addFolderIcon || '📂' }}</span>
        Add Folder
      </button>
      <button class="folder-structure__button" @click="addRootLeaf">
        <span class="folder-structure__button-icon">{{ content?.addFileIcon || '📄' }}</span>
        Add File
      </button>
    </div>

    <div class="folder-structure__container">
      <vue-tree-list
        @click="onClick"
        @change-name="onChangeName"
        @delete-node="onDeleteNode"
        @add-node="onAddNode"
        @drop="onDrop"
        :model="treeData"
        :default-tree-node-name="content?.defaultFolderName"
        :default-leaf-node-name="content?.defaultFileName"
        :default-expanded="content?.defaultExpanded"
      >
        <template v-slot:leafNameDisplay="slotProps">
          <span class="folder-structure__item-name">
            {{ slotProps.model.name }}
            <span class="folder-structure__item-id" v-if="content?.showIds">
              #{{ slotProps.model.id }}
            </span>
          </span>
        </template>
        <span class="folder-structure__icon" slot="addTreeNodeIcon">
          {{ content?.addFolderIcon || '📂' }}
        </span>
        <span class="folder-structure__icon" slot="addLeafNodeIcon">
          {{ content?.addFileIcon || '📄' }}
        </span>
        <span class="folder-structure__icon" slot="editNodeIcon">
          {{ content?.editIcon || '✏️' }}
        </span>
        <span class="folder-structure__icon" slot="delNodeIcon">
          {{ content?.deleteIcon || '🗑️' }}
        </span>
        <span class="folder-structure__icon" slot="leafNodeIcon">
          {{ content?.fileIcon || '📄' }}
        </span>
        <span class="folder-structure__icon" slot="treeNodeIcon">
          {{ content?.folderIcon || '📂' }}
        </span>
      </vue-tree-list>
    </div>

    <div class="folder-structure__drag-instructions" v-if="showDragInstructions">
      <div class="folder-structure__instruction">
        <div class="folder-structure__instruction-icon">🖱️</div>
        <div class="folder-structure__instruction-text">Drag files and folders to reorganize</div>
      </div>
      <div class="folder-structure__instruction">
        <div class="folder-structure__instruction-icon">✏️</div>
        <div class="folder-structure__instruction-text">Double-click to rename</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue';
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list';

export default {
  components: {
    VueTreeList
  },
  props: {
    content: { 
      type: Object, 
      required: true 
    },
    uid: { 
      type: String, 
      required: true 
    },
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Editor state
    const isEditing = computed(() => {
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Internal variables
    const { value: selectedNode, setValue: setSelectedNode } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'selectedNode',
      type: 'object',
      defaultValue: null
    });

    const { value: treeStructure, setValue: setTreeStructure } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'treeStructure',
      type: 'object',
      defaultValue: {}
    });

    // Initialize tree data
    const treeData = ref(null);
    const showDragInstructions = ref(true);

    // Watch for initial data changes
    watch(() => props.content?.initialData, (newValue) => {
      if (newValue) {
        try {
          const parsedData = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
          treeData.value = new Tree(parsedData || []);
          updateTreeStructure();
        } catch (error) {
          console.error('Error parsing tree data:', error);
          treeData.value = new Tree([]);
        }
      } else {
        treeData.value = new Tree([]);
      }
    }, { immediate: true });

    // Computed properties
    const showControls = computed(() => props.content?.showControls !== false);

    // Methods
    const onClick = (node) => {
      if (isEditing.value) return;

      setSelectedNode(convertNodeToPlainObject(node));

      emit('trigger-event', {
        name: 'nodeClick',
        event: { value: convertNodeToPlainObject(node) }
      });
    };

    const onChangeName = (params) => {
      if (isEditing.value) return;

      emit('trigger-event', {
        name: 'nodeRenamed',
        event: { 
          value: {
            node: convertNodeToPlainObject(params.node),
            oldName: params.oldName,
            newName: params.newName
          }
        }
      });

      updateTreeStructure();
    };

    const onDeleteNode = (node) => {
      if (isEditing.value) return;

      emit('trigger-event', {
        name: 'nodeDeleted',
        event: { value: convertNodeToPlainObject(node) }
      });

      node.remove();
      updateTreeStructure();
    };

    const onAddNode = (params) => {
      if (isEditing.value) return;

      emit('trigger-event', {
        name: 'nodeAdded',
        event: { 
          value: {
            parentNode: convertNodeToPlainObject(params.parentNode),
            node: convertNodeToPlainObject(params.node)
          }
        }
      });

      updateTreeStructure();
    };

    const onDrop = (params) => {
      if (isEditing.value) return;

      emit('trigger-event', {
        name: 'nodeMoved',
        event: { 
          value: {
            node: convertNodeToPlainObject(params.node),
            targetNode: convertNodeToPlainObject(params.targetNode),
            placement: params.placement
          }
        }
      });

      updateTreeStructure();
    };

    const addRootNode = () => {
      if (isEditing.value) return;

      const newNode = new TreeNode({ 
        name: props.content?.defaultFolderName || 'New Folder', 
        isLeaf: false,
        id: generateUniqueId()
      });

      treeData.value.addChildren(newNode);

      emit('trigger-event', {
        name: 'nodeAdded',
        event: { 
          value: {
            parentNode: null,
            node: convertNodeToPlainObject(newNode)
          }
        }
      });

      updateTreeStructure();
    };

    const addRootLeaf = () => {
      if (isEditing.value) return;

      const newLeaf = new TreeNode({ 
        name: props.content?.defaultFileName || 'New File', 
        isLeaf: true,
        id: generateUniqueId()
      });

      treeData.value.addChildren(newLeaf);

      emit('trigger-event', {
        name: 'nodeAdded',
        event: { 
          value: {
            parentNode: null,
            node: convertNodeToPlainObject(newLeaf)
          }
        }
      });

      updateTreeStructure();
    };

    const updateTreeStructure = () => {
      if (!treeData.value) return;

      const structure = convertNodeToPlainObject(treeData.value);
      setTreeStructure(structure);

      emit('trigger-event', {
        name: 'treeUpdated',
        event: { value: structure }
      });
    };

    const convertNodeToPlainObject = (node) => {
      if (!node) return null;

      const result = {};

      // Copy all properties except children and parent
      for (const key in node) {
        if (key !== 'children' && key !== 'parent' && typeof node[key] !== 'function') {
          result[key] = node[key];
        }
      }

      // Process children recursively
      if (node.children && node.children.length > 0) {
        result.children = node.children.map(child => convertNodeToPlainObject(child));
      }

      return result;
    };

    const generateUniqueId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    };

    // Initialize with default data if no initial data provided
    onMounted(() => {
      if (!treeData.value) {
        treeData.value = new Tree([
          {
            name: 'Documents',
            id: 'folder-1',
            children: [
              {
                name: 'Project Plan.pdf',
                id: 'file-1',
                isLeaf: true
              },
              {
                name: 'Meeting Notes',
                id: 'folder-2',
                children: [
                  {
                    name: 'January.docx',
                    id: 'file-2',
                    isLeaf: true
                  }
                ]
              }
            ]
          },
          {
            name: 'Images',
            id: 'folder-3',
            children: [
              {
                name: 'logo.png',
                id: 'file-3',
                isLeaf: true
              }
            ]
          }
        ]);

        updateTreeStructure();
      }
      
      // Hide instructions after 10 seconds
      setTimeout(() => {
        showDragInstructions.value = false;
      }, 10000);
    });

    // Actions
    const expandAll = () => {
      if (!treeData.value) return;

      const expandNode = (node) => {
        if (node.expanded !== undefined) {
          node.expanded = true;
        }

        if (node.children && node.children.length) {
          node.children.forEach(expandNode);
        }
      };

      expandNode(treeData.value);
    };

    const collapseAll = () => {
      if (!treeData.value) return;

      const collapseNode = (node) => {
        if (node.expanded !== undefined) {
          node.expanded = false;
        }

        if (node.children && node.children.length) {
          node.children.forEach(collapseNode);
        }
      };

      collapseNode(treeData.value);
    };

    const getTreeData = () => {
      return convertNodeToPlainObject(treeData.value);
    };

    return {
      treeData,
      selectedNode,
      treeStructure,
      showControls,
      showDragInstructions,
      onClick,
      onChangeName,
      onDeleteNode,
      onAddNode,
      onDrop,
      addRootNode,
      addRootLeaf,
      expandAll,
      collapseAll,
      getTreeData
    };
  }
};
</script>

<style lang="scss" scoped>
.folder-structure {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;

  &__actions {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #e9e9e9;
    }
  }

  &__button-icon {
    font-size: 16px;
  }

  &__container {
    flex: 1;
    overflow: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    background-color: #fcfcfc;
  }

  &__icon {
    cursor: pointer;
    margin-right: 4px;
  }

  &__item-name {
    display: inline-flex;
    align-items: center;
  }

  &__item-id {
    color: #888;
    font-size: 80%;
    margin-left: 4px;
  }

  &__drag-instructions {
    margin-top: 12px;
    padding: 8px;
    background-color: #f8f9fa;
    border: 1px dashed #ddd;
    border-radius: 4px;
  }

  &__instruction {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__instruction-icon {
    margin-right: 8px;
    font-size: 16px;
  }

  &__instruction-text {
    font-size: 14px;
    color: #666;
  }
}

// Override vue-tree-list styles
:deep(.vtl-node-main) {
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  cursor: grab;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    cursor: grabbing;
  }
}

:deep(.vtl-operation) {
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
}

:deep(.vtl-drag-disabled) {
  background-color: #f0f0f0;
  opacity: 0.7;
}

:deep(.vtl-disabled) {
  background-color: #f0f0f0;
  opacity: 0.7;
}

:deep(.vtl-tree-node) {
  position: relative;
  margin-bottom: 2px;
}

:deep(.vtl-tree-margin) {
  position: relative;
}

:deep(.vtl-dragging-node) {
  background-color: #e6f7ff !important;
  border: 1px dashed #1890ff !important;
}

:deep(.vtl-drag-over-gap-top) {
  border-top: 2px dashed #1890ff !important;
}

:deep(.vtl-drag-over-gap-bottom) {
  border-bottom: 2px dashed #1890ff !important;
}

:deep(.vtl-drag-over) {
  background-color: #e6f7ff !important;
}
</style>