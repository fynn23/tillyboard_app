export default {
options: {
displayAllowedValues: ['flex', 'inline-flex', 'block'],
},
inherit: {
type: 'ww-layout',
},
editor: {
label: {
en: 'Interactive Canvas',
de: 'Interaktives Canvas',
},
icon: 'image',
},
properties: {
uploadText: {
label: {
en: 'Upload Text',
de: 'Upload-Text',
},
type: 'Text',
bindable: true,
defaultValue: 'Drop images here',
section: 'settings',
},
uploadSubtext: {
label: {
en: 'Upload Subtext',
de: 'Upload-Untertext',
},
type: 'Text',
bindable: true,
defaultValue: 'or drag and drop files',
section: 'settings',
},
resetButtonText: {
label: {
en: 'Reset Button Text',
de: 'Zurücksetzen-Button Text',
},
type: 'Text',
bindable: true,
defaultValue: 'Reset Canvas',
section: 'settings',
},
deleteButtonText: {
label: {
en: 'Delete Button Text',
de: 'Löschen-Button Text',
},
type: 'Text',
bindable: true,
defaultValue: 'Delete',
section: 'settings',
},
snapToGrid: {
label: {
en: 'Snap to Grid',
de: 'Am Raster ausrichten',
},
type: 'OnOff',
bindable: true,
defaultValue: true,
section: 'settings',
},
showGrid: {
label: {
en: 'Show Grid',
de: 'Raster anzeigen',
},
type: 'OnOff',
bindable: true,
defaultValue: true,
section: 'settings',
},
gridSize: {
label: {
en: 'Grid Size',
de: 'Rastergröße',
},
type: 'Number',
bindable: true,
defaultValue: 50,
section: 'settings',
options: {
min: 10,
max: 100,
step: 5
},
},
defaultColorField: {
label: {
en: 'Default Color Field',
de: 'Standard-Farbfeld',
},
type: 'Color',
bindable: true,
defaultValue: '#3498db',
section: 'settings',
},
backgroundColor: {
label: {
en: 'Background Color',
de: 'Hintergrundfarbe',
},
type: 'Color',
bindable: true,
defaultValue: '#f5f5f5',
section: 'style',
},
backgroundPattern: {
label: {
en: 'Background Pattern',
de: 'Hintergrundmuster',
},
type: 'Image',
bindable: true,
defaultValue: null,
section: 'style',
},
minHeight: {
label: {
en: 'Minimum Height',
de: 'Mindesthöhe',
},
type: 'Length',
bindable: true,
defaultValue: '300px',
section: 'style',
},
borderRadius: {
label: {
en: 'Border Radius',
de: 'Rahmenradius',
},
type: 'Length',
bindable: true,
defaultValue: '8px',
section: 'style',
},
showBorder: {
label: {
en: 'Show Border',
de: 'Rahmen anzeigen',
},
type: 'OnOff',
bindable: true,
defaultValue: true,
section: 'style',
},
borderColor: {
label: {
en: 'Border Color',
de: 'Rahmenfarbe',
},
type: 'Color',
bindable: true,
defaultValue: '#ddd',
section: 'style',
},
},
triggerEvents: [
{
name: 'upload',
label: { 
en: 'On image upload',
de: 'Beim Bild-Upload'
},
event: { item: {} }
},
{
name: 'delete',
label: { 
en: 'On item delete',
de: 'Beim Element-Löschen'
},
event: { item: {} }
},
{
name: 'move',
label: { 
en: 'On item move',
de: 'Beim Element-Verschieben'
},
event: { item: {} }
},
{
name: 'resize',
label: { 
en: 'On item resize',
de: 'Bei Größenänderung'
},
event: { item: {} }
},
{
name: 'textEdit',
label: { 
en: 'On text edit',
de: 'Bei Textbearbeitung'
},
event: { item: {} }
},
{
name: 'addText',
label: { 
en: 'On text add',
de: 'Bei Text-Hinzufügung'
},
event: { item: {} }
},
{
name: 'addColorField',
label: { 
en: 'On color field add',
de: 'Bei Farbfeld-Hinzufügung'
},
event: { item: {} }
},
{
name: 'change',
label: { 
en: 'On canvas change',
de: 'Bei Canvas-Änderung'
},
event: { items: [] }
},
{
name: 'reset',
label: { 
en: 'On canvas reset',
de: 'Bei Canvas-Zurücksetzung'
},
event: {}
}
],
actions: [
{
action: 'addImage',
label: { 
en: 'Add image',
de: 'Bild hinzufügen'
},
args: [
{
name: 'imageUrl',
type: 'string',
label: { 
en: 'Image URL',
de: 'Bild-URL'
}
}
]
},
{
action: 'addText',
label: { 
en: 'Add text',
de: 'Text hinzufügen'
}
},
{
action: 'addColorField',
label: { 
en: 'Add color field',
de: 'Farbfeld hinzufügen'
}
},
{
action: 'resetCanvas',
label: { 
en: 'Reset canvas',
de: 'Canvas zurücksetzen'
}
}
]
};