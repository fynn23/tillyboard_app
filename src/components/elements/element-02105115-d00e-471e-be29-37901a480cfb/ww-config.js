export default {
editor: {
label: {
en: 'File & vCard Downloader',
de: 'Datei & vCard-Downloader'
},
icon: 'download'
},
properties: {
fileUrl: {
label: {
en: 'File URL',
de: 'Datei-URL'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: '',
},
fileName: {
label: {
en: 'File Name',
de: 'Dateiname'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'download',
},
downloadButtonColor: {
label: {
en: 'Download Button Color',
de: 'Download-Schaltflächenfarbe'
},
type: 'Color',
bindable: true,
section: 'style',
defaultValue: '#48c774',
},
downloadButtonHoverColor: {
label: {
en: 'Download Button Hover Color',
de: 'Download-Schaltflächen-Hover-Farbe'
},
type: 'Color',
bindable: true,
section: 'style',
defaultValue: '#3abb67',
},
vCardFirstName: {
label: {
en: 'First Name',
de: 'Vorname'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'John',
},
vCardLastName: {
label: {
en: 'Last Name',
de: 'Nachname'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'Doe',
},
vCardEmail: {
label: {
en: 'Email',
de: 'E-Mail'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'john.doe@example.com',
},
vCardPhone: {
label: {
en: 'Phone',
de: 'Telefon'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: '+1234567890',
},
vCardCompany: {
label: {
en: 'Company',
de: 'Firma'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'Example Company',
},
vCardJobTitle: {
label: {
en: 'Job Title',
de: 'Berufsbezeichnung'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'Software Developer',
},
vCardWebsite: {
label: {
en: 'Website',
de: 'Webseite'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: 'https://example.com',
},
vCardAddress: {
label: {
en: 'Address',
de: 'Adresse'
},
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: '123 Main St, City, Country',
},
useVCard: {
label: {
en: 'Generate vCard',
de: 'vCard generieren'
},
type: 'OnOff',
bindable: true,
section: 'settings',
defaultValue: true,
}
},
triggerEvents: [
{
name: 'downloaded',
label: {
en: 'On File Downloaded',
de: 'Bei Datei-Download'
},
event: {
value: ''
}
},
{
name: 'error',
label: {
en: 'On Error',
de: 'Bei Fehler'
},
event: {
value: ''
}
}
],
actions: [
{
action: 'downloadFile',
label: {
en: 'Download File',
de: 'Datei herunterladen'
}
}
]
};