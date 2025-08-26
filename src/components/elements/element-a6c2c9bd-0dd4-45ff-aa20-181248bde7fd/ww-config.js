export default {
editor: {
label: {
en: 'QR Code Scanner',
de: 'QR-Code Scanner'
},
icon: 'camera'
},
properties: {
scanFrequency: {
label: {
en: 'Scan Frequency (ms)',
de: 'Scan-Frequenz (ms)'
},
type: 'Number',
section: 'settings',
bindable: true,
options: {
min: 100,
max: 2000,
step: 100
},
defaultValue: 500,
},
preferredCamera: {
label: {
en: 'Preferred Camera',
de: 'Bevorzugte Kamera'
},
type: 'TextSelect',
section: 'settings',
bindable: true,
options: {
options: [
{ value: 'environment', label: 'Back Camera (Environment)' },
{ value: 'user', label: 'Front Camera (User)' }
]
},
defaultValue: 'environment',
},
showControls: {
label: {
en: 'Show Controls',
de: 'Steuerelemente anzeigen'
},
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: true,
},
showScanline: {
label: {
en: 'Show Scan Line',
de: 'Scanlinie anzeigen'
},
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: true,
},
showLastResult: {
label: {
en: 'Show Last Result',
de: 'Letztes Ergebnis anzeigen'
},
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: true,
},
showCameraPreview: {
label: {
en: 'Show Camera Preview',
de: 'Kamera-Vorschau anzeigen'
},
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: false,
},
autoStart: {
label: {
en: 'Auto Start Scanning',
de: 'Scannen automatisch starten'
},
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: true,
},
backgroundColor: {
label: {
en: 'Background Color',
de: 'Hintergrundfarbe'
},
type: 'Color',
section: 'style',
bindable: true,
defaultValue: 'transparent',
},
borderRadius: {
label: {
en: 'Border Radius',
de: 'Rahmenradius'
},
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '0px',
},
scanRegionEnabled: {
label: {
en: 'Enable Scan Region',
de: 'Scan-Bereich aktivieren'
},
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: false,
},
scanRegionSize: {
label: {
en: 'Scan Region Size (%)',
de: 'Scan-Bereich Größe (%)'
},
type: 'Number',
section: 'settings',
bindable: true,
options: {
min: 10,
max: 90,
step: 5
},
defaultValue: 50,
},
scanRegionBorderColor: {
label: {
en: 'Scan Region Border Color',
de: 'Scan-Bereich Rahmenfarbe'
},
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#FF0000',
},
scanRegionBorderWidth: {
label: {
en: 'Scan Region Border Width',
de: 'Scan-Bereich Rahmenbreite'
},
type: 'Number',
section: 'style',
bindable: true,
options: {
min: 1,
max: 10,
step: 1
},
defaultValue: 2,
}
},
triggerEvents: [
{
name: 'scan',
label: {
en: 'On QR Code Scan',
de: 'Bei QR-Code-Scan'
},
event: {
value: ''
}
}
],
actions: [
{
action: 'startScan',
label: {
en: 'Start Scanning',
de: 'Scannen starten'
}
},
{
action: 'stopScan',
label: {
en: 'Stop Scanning',
de: 'Scannen stoppen'
}
},
{
action: 'resetScanner',
label: {
en: 'Reset Scanner',
de: 'Scanner zurücksetzen'
}
},
{
action: 'switchCamera',
label: {
en: 'Switch Camera',
de: 'Kamera wechseln'
}
}
]
};