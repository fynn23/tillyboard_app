export default {
  editor: {
    label: {
      en: 'Folder Structure',
    },
    icon: 'folder',
  },
  properties: {
    initialData: {
      label: { 
        en: 'Initial Data',
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: JSON.stringify([
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
      ]),
    },
    defaultExpanded: {
      label: { 
        en: 'Default Expanded',
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    showControls: {
      label: { 
        en: 'Show Controls',
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    },
    showIds: {
      label: { 
        en: 'Show IDs',
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    defaultFolderName: {
      label: { 
        en: 'Default Folder Name',
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'New Folder',
    },
    defaultFileName: {
      label: { 
        en: 'Default File Name',
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'New File',
    },
    folderIcon: {
      label: { 
        en: 'Folder Icon',
      },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '📂',
    },
    fileIcon: {
      label: { 
        en: 'File Icon',
      },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '📄',
    },
    addFolderIcon: {
      label: { 
        en: 'Add Folder Icon',
      },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '📂',
    },
    addFileIcon: {
      label: { 
        en: 'Add File Icon',
      },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '📄',
    },
    editIcon: {
      label: { 
        en: 'Edit Icon',
      },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '✏️',
    },
    deleteIcon: {
      label: { 
        en: 'Delete Icon',
      },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '🗑️',
    }
  },
  triggerEvents: [
    {
      name: 'nodeClick',
      label: { en: 'On node click' },
      event: { value: {} }
    },
    {
      name: 'nodeAdded',
      label: { en: 'On node added' },
      event: { value: {} }
    },
    {
      name: 'nodeRenamed',
      label: { en: 'On node renamed' },
      event: { value: {} }
    },
    {
      name: 'nodeDeleted',
      label: { en: 'On node deleted' },
      event: { value: {} }
    },
    {
      name: 'nodeMoved',
      label: { en: 'On node moved' },
      event: { value: {} }
    },
    {
      name: 'treeUpdated',
      label: { en: 'On tree updated' },
      event: { value: {} }
    }
  ],
  actions: [
    {
      action: 'expandAll',
      label: { en: 'Expand all' }
    },
    {
      action: 'collapseAll',
      label: { en: 'Collapse all' }
    },
    {
      action: 'addRootNode',
      label: { en: 'Add root folder' }
    },
    {
      action: 'addRootLeaf',
      label: { en: 'Add root file' }
    },
    {
      action: 'getTreeData',
      label: { en: 'Get tree data' }
    }
  ]
};