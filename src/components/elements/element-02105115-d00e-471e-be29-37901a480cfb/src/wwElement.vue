<template>
<div class="file-downloader">
<div class="download-container">
<button 
class="download-btn" 
@click="handleDownload" 
:disabled="isEditing || (!useVCard && !fileUrl)">
Download {{ useVCard ? 'Contact' : 'File' }}
</button>
</div>
</div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
props: {
content: { type: Object, required: true },
uid: { type: String, required: true },
},
emits: ['trigger-event'],
setup(props, { emit }) {
// Editor state
const isEditing = computed(() => {
// eslint-disable-next-line no-unreachable
return false;
});

// File URL and filename
const fileUrl = computed(() => props.content?.fileUrl || '');
const fileName = computed(() => props.content?.fileName || 'download');
const useVCard = computed(() => props.content?.useVCard ?? true);

// vCard properties
const vCardFirstName = computed(() => props.content?.vCardFirstName || 'John');
const vCardLastName = computed(() => props.content?.vCardLastName || 'Doe');
const vCardEmail = computed(() => props.content?.vCardEmail || 'john.doe@example.com');
const vCardPhone = computed(() => props.content?.vCardPhone || '+1234567890');
const vCardCompany = computed(() => props.content?.vCardCompany || 'Example Company');
const vCardJobTitle = computed(() => props.content?.vCardJobTitle || 'Software Developer');
const vCardWebsite = computed(() => props.content?.vCardWebsite || 'https://example.com');
const vCardAddress = computed(() => props.content?.vCardAddress || '123 Main St, City, Country');

// Internal variable for the download status
const { value: downloadStatus, setValue: setDownloadStatus } = wwLib.wwVariable.useComponentVariable({
uid: props.uid,
name: 'downloadStatus',
type: 'string',
defaultValue: 'ready',
});

// Generate vCard content
const generateVCard = () => {
const now = new Date();
const formattedDate = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

return [
'BEGIN:VCARD',
'VERSION:3.0',
`N:${vCardLastName.value};${vCardFirstName.value};;;`,
`FN:${vCardFirstName.value} ${vCardLastName.value}`,
`ORG:${vCardCompany.value}`,
`TITLE:${vCardJobTitle.value}`,
`EMAIL;type=INTERNET;type=WORK:${vCardEmail.value}`,
`TEL;type=CELL:${vCardPhone.value}`,
`URL:${vCardWebsite.value}`,
`ADR;type=WORK:;;${vCardAddress.value}`,
`REV:${formattedDate}`,
'END:VCARD'
].join('\n');
};

// Download file from URL
const downloadFile = () => {
if (isEditing.value || !fileUrl.value) return;

setDownloadStatus('downloading');

fetch(fileUrl.value)
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.blob();
})
.then(blob => {
const link = document.createElement('a');
link.download = fileName.value;
link.href = URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(link.href);

setDownloadStatus('completed');
emit('trigger-event', {
name: 'downloaded',
event: { value: fileName.value }
});
})
.catch(error => {
console.error('Error downloading file:', error);
setDownloadStatus('error');
emit('trigger-event', {
name: 'error',
event: { value: 'Failed to download file' }
});
});
};

// Download vCard
const downloadVCard = () => {
if (isEditing.value) return;

try {
setDownloadStatus('downloading');

const vCardContent = generateVCard();
const blob = new Blob([vCardContent], { type: 'text/vcard' });
const link = document.createElement('a');
const vCardFileName = `${vCardFirstName.value}_${vCardLastName.value}.vcf`;

link.download = vCardFileName;
link.href = URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(link.href);

setDownloadStatus('completed');
emit('trigger-event', {
name: 'downloaded',
event: { value: vCardFileName }
});
} catch (error) {
console.error('Error creating vCard:', error);
setDownloadStatus('error');
emit('trigger-event', {
name: 'error',
event: { value: 'Failed to create vCard' }
});
}
};

// Handle download based on mode
const handleDownload = () => {
if (useVCard.value) {
downloadVCard();
} else {
downloadFile();
}
};

return {
fileUrl,
fileName,
useVCard,
downloadStatus,
isEditing,
handleDownload,
setDownloadStatus
};
}
};
</script>

<style lang="scss" scoped>
.file-downloader {
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
font-family: sans-serif;

.download-container {
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
}

.download-btn {
padding: 12px 24px;
background-color: v-bind('props.content?.downloadButtonColor || "#48c774"');
color: white;
border: none;
border-radius: 4px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s;

&:hover:not(:disabled) {
background-color: v-bind('props.content?.downloadButtonHoverColor || "#3abb67"');
}

&:disabled {
background-color: #cccccc;
cursor: not-allowed;
}
}
}
</style>