export default {
editor: {
label: {
en: "Stack",
},
icon: "inbox-in",
customSettingsPropertiesOrder: [
"group",
"items",
"sortable",
"readonly",
"customDragHandle",
["handleClass"],
"allowKey",
"allowValues",
]
},
states: ['readonly'],
triggerEvents: [
{
name: "item:moved",
label: { en: "On item moved" },
event: {
item: {},
oldIndex: 0,
newIndex: 1,
updatedList: [],
},
},
{
name: "item:added",
label: { en: "On item added" },
event: {
item: {},
newIndex: 1,
updatedList: [],
},
},
{
name: "item:removed",
label: { en: "On item removed" },
event: {
item: {},
oldIndex: 0,
updatedList: [],
},
},
{
name: "item:rejected",
label: { en: "On item rejected" },
event: {
item: {},
reason: "value-restricted",
},
},
],
properties: {   
group: {
hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.group),
label: {
en: "Group",
},
type: "Text",
bindable: true,
defaultValue: "common",
section: "settings",
},
items: {
hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.items),
label: {
en: "Items",
},
type: "Info",
options: {
text: { en: "Bind your data" },
},
bindable: true,
defaultValue: [],
section: "settings",
},
sortable: {
hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.sortable),
bindable: true,
label: {
en: "Sortable",
},
type: "OnOff",
defaultValue: true,
section: "settings",
},
itemElement: {
hidden: true,
defaultValue: [{ isWwObject: true, type: "ww-flexbox" }],
navigator: {
group: "Item",
},
},
headerElement: {
hidden: true,
defaultValue: [{ isWwObject: true, type: "ww-text" }],
navigator: {
group: "Header",
},
},
footerElement: {
hidden: true,
defaultValue: [],
navigator: {
group: "Footer",
},
},
readonly: {
label: { en: "Read only", fr: "Lecture seule" },
type: "OnOff",
section: "settings",
bindable: true,
defaultValue: false,
},
customDragHandle: {
label: 'Custom drag',
type: 'OnOff',
section: 'settings',
defaultValue: false,
hidden: (content, sidePanelContent, boundProps, wwProps) => wwProps?.handle?.length,
},
handleClass: {
label: "Class name",
type: "Text",
bindable: true,
section: "settings",
defaultValue: "draggable",
options: {
placeholder: "draggable",
},
hidden: (content, sidePanelContent, boundProps, wwProps) => !content.customDragHandle || wwProps?.handle?.length,
},
allowKey: {
label: { en: "Restriction key", fr: "Clé de restriction" },
type: "Text",
bindable: true,
section: "settings",
defaultValue: "type",
hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.allowKey),
},
allowValues: {
label: { en: "Allowed values", fr: "Valeurs autorisées" },
type: "Text",
bindable: true,
section: "settings",
defaultValue: "",
hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.allowValues),
},
},
};