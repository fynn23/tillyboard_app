<template>
<div class="qr-scanner-container" :style="containerStyle">
<div class="video-container" ref="videoContainer">
<video
ref="video"
class="scanner-video"
:class="{ scanning: isScanning && !isPaused }"
autoplayscan-region
playsinline
muted
></video>
<canvas ref="canvas" class="scanner-canvas"></canvas>
<div ref="flashOverlay" class="flash-overlay"></div>
<div :style="scanRegionStyle" class="scan-region">
<div class="scan-region-corner top-left"></div>
<div class="scan-region-corner top-right"></div>
<div class="scan-region-corner bottom-left"></div>
<div class="scan-region-corner bottom-right"></div>
</div>

<div v-if="!hasCamera" class="camera-error">
<div class="error-message">{{ cameraErrorMessage }}</div>
<button class="permission-button" @click="requestCameraPermission">
Kamera Zugriff erlauben
</button>
</div>

<div v-if="isScanning && !isPaused && showScanline" class="scan-line"></div>

<div v-if="showLastResult && lastResult" class="last-result">
<div class="result-text">{{ lastResult }}</div>
</div>
</div>

<div v-if="showControls" class="scanner-controls">
<button 
v-if="availableCameras.length > 1" 
class="camera-switch-btn" 
@click="switchCamera"
>
Switch Camera
</button>

<button 
class="scan-toggle-btn" 
@click="toggleScanning"
>
{{ isScanning && !isPaused ? 'Pause' : 'Start Scanning' }}
</button>
</div>
</div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import jsQR from 'jsqr';

export default {
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

// Refs for DOM elements
const video = ref(null);
const canvas = ref(null);
const videoContainer = ref(null);
const flashOverlay = ref(null); // Add this

// State variables
const isScanning = ref(false);
const isPaused = ref(false);
const hasCamera = ref(true);
const cameraErrorMessage = ref('');
const availableCameras = ref([]);
const currentCameraIndex = ref(0);
const lastResult = ref('');
const scanInterval = ref(null);
const stream = ref(null);

// Internal variable to expose the scanned value
const { value: scannedValue, setValue: setScannedValue } = wwLib.wwVariable.useComponentVariable({
uid: props.uid,
name: 'scannedValue',
type: 'string',
defaultValue: ''
});

// Computed properties from content
const scanFrequency = computed(() => {
const freq = props.content?.scanFrequency || 500;
return Math.max(100, Math.min(2000, freq)); // Clamp between 100ms and 2000ms
});

const preferredCamera = computed(() => props.content?.preferredCamera || 'environment');
const showControls = computed(() => props.content?.showControls !== false);
const showScanline = computed(() => props.content?.showScanline !== false);
const showLastResult = computed(() => props.content?.showLastResult !== false);
const autoStart = computed(() => props.content?.autoStart !== false);
const scanRegionEnabled = computed(() => props.content?.scanRegionEnabled || false);
const scanRegionSize = computed(() => {
const size = props.content?.scanRegionSize || 50;
return Math.max(10, Math.min(90, size)); // Clamp between 10% and 90%
});
const scanRegionBorderColor = computed(() => props.content?.scanRegionBorderColor || '#FF0000');
const scanRegionBorderWidth = computed(() => {
const width = props.content?.scanRegionBorderWidth || 2;
return Math.max(1, Math.min(10, width)); // Clamp between 1px and 10px
});

// Computed values for the scan region dimensions
const scanRegionStyle = computed(() => {
const sizePercent = scanRegionSize.value;
return {
position: 'absolute',
top: `${(100 - sizePercent) / 2}%`,
left: `${(100 - sizePercent) / 2}%`,
width: `${sizePercent}%`,
height: `${sizePercent}%`,
borderWidth: '0px',
pointerEvents: 'none',
zIndex: 100,
boxSizing: 'border-box',
opacity: scanRegionEnabled.value ? 1 : 0,
visibility: scanRegionEnabled.value ? 'visible' : 'hidden'
};
});

const containerStyle = computed(() => ({
backgroundColor: props.content?.backgroundColor || 'transparent',
borderRadius: props.content?.borderRadius || '0px',
overflow: 'hidden'
}));

// Camera handling functions
const getCameras = async () => {
try {
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
throw new Error('Media Devices API not supported');
}

const devices = await navigator.mediaDevices.enumerateDevices();
const cameras = devices.filter(device => device.kind === 'videoinput');
availableCameras.value = cameras;

if (cameras.length === 0) {
throw new Error('No cameras found');
}

return cameras;
} catch (error) {
console.error('Error getting cameras:', error);
hasCamera.value = false;
cameraErrorMessage.value = `Camera error: ${error.message || 'Unable to access camera'}`;
return [];
}
};

const startCamera = async () => {
try {
if (stream.value) {
stopMediaTracks();
}

const cameras = await getCameras();
if (cameras.length === 0) return;

// Determine which camera to use
let constraints = { 
video: { 
facingMode: preferredCamera.value 
},
audio: false
};

// If we have specific device IDs, use them
if (cameras.length > 1 && cameras[currentCameraIndex.value]?.deviceId) {
constraints = {
video: {
deviceId: { exact: cameras[currentCameraIndex.value].deviceId }
},
audio: false
};
}

stream.value = await navigator.mediaDevices.getUserMedia(constraints);

if (video.value) {
video.value.srcObject = stream.value;
video.value.onloadedmetadata = () => {
video.value.play();
hasCamera.value = true;

if (autoStart.value) {
startScanning();
}
};
}
} catch (error) {
console.error('Error starting camera:', error);
hasCamera.value = false;
cameraErrorMessage.value = `Camera error: ${error.message || 'Unable to access camera'}`;
}
};

const requestCameraPermission = async () => {
try {
await navigator.mediaDevices.getUserMedia({ video: true });
// If we get here, permission was granted
hasCamera.value = true;
cameraErrorMessage.value = '';
await startCamera();
} catch (error) {
console.error('Camera permission denied:', error);
cameraErrorMessage.value = `Camera error: ${error.message || 'Permission denied'}`;
}
};

const stopMediaTracks = () => {
if (stream.value && stream.value.getTracks) {
stream.value.getTracks().forEach(track => track.stop());
}
stream.value = null;
};

const switchCamera = async () => {
if (availableCameras.value.length <= 1) return;

currentCameraIndex.value = (currentCameraIndex.value + 1) % availableCameras.value.length;

const wasScanning = isScanning.value && !isPaused.value;
if (wasScanning) {
stopScanning();
}

await startCamera();

if (wasScanning) {
startScanning();
}
};

// QR code scanning functions
const startScanning = () => {
if (!hasCamera.value || !video.value || !canvas.value) return;

isScanning.value = true;
isPaused.value = false;

if (scanInterval.value) {
clearInterval(scanInterval.value);
}

scanInterval.value = setInterval(scanQRCode, scanFrequency.value);

// Also scan immediately
setTimeout(scanQRCode, 100); // Add a small delay to ensure video is ready
};

const stopScanning = () => {
if (scanInterval.value) {
clearInterval(scanInterval.value);
scanInterval.value = null;
}

isPaused.value = true;
};

const toggleScanning = () => {
if (!hasCamera.value) return;

if (!isScanning.value || isPaused.value) {
startScanning();
} else {
stopScanning();
};
};

const scanQRCode = () => {
if (!video.value || !canvas.value || !hasCamera.value || isPaused.value || isEditing.value) return;

const videoElement = video.value;
const canvasElement = canvas.value;

if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) return;

const canvasContext = canvasElement.getContext('2d');

// Set canvas dimensions to match video
canvasElement.width = videoElement.videoWidth;
canvasElement.height = videoElement.videoHeight;

// Draw current video frame to canvas
canvasContext.drawImage(
videoElement, 
0, 
0, 
canvasElement.width, 
canvasElement.height
);

// Get image data for QR code processing
let imageData;

if (scanRegionEnabled.value) {
// Calculate the scan region dimensions in pixels
const regionSize = scanRegionSize.value / 100;
const x = Math.floor((canvasElement.width * (1 - regionSize)) / 2);
const y = Math.floor((canvasElement.height * (1 - regionSize)) / 2);
const width = Math.floor(canvasElement.width * regionSize);
const height = Math.floor(canvasElement.height * regionSize);

// Get image data only from the scan region
imageData = canvasContext.getImageData(x, y, width, height);
} else {
// Get image data from the entire canvas
imageData = canvasContext.getImageData(
0, 
0, 
canvasElement.width, 
canvasElement.height
);
}

// Process with jsQR
const code = jsQR(
imageData.data, 
imageData.width, 
imageData.height, 
{
inversionAttempts: "dontInvert"
}
);

// If QR code found
if (code) {
const newValue = code.data;

// Only update if the value has changed
if (newValue !== lastResult.value) {
lastResult.value = newValue;
setScannedValue(newValue);

// Show green flash effect
showFlash();

// Emit the scan event without stopping the camera
if (!isEditing.value) {
emit('trigger-event', {
name: 'scan',
event: { value: newValue }
});
}
}
}
};

// Show flash effect
const showFlash = () => {
if (!flashOverlay.value) return;

flashOverlay.value.style.opacity = '1';
setTimeout(() => {
if (flashOverlay.value) {
flashOverlay.value.style.opacity = '0';
}
}, 300);
};

// Lifecycle hooks
onMounted(async () => {
if (!isEditing.value) {
await startCamera();
}
});

onBeforeUnmount(() => {
if (scanInterval.value) {
clearInterval(scanInterval.value);
}
stopMediaTracks();
});

// Watch for changes in scan frequency
watch(scanFrequency, (newFreq) => {
if (isScanning.value && !isPaused.value && scanInterval.value) {
clearInterval(scanInterval.value);
scanInterval.value = setInterval(scanQRCode, newFreq);
}
});

// Watch for changes in preferred camera
watch(preferredCamera, async () => {
if (!isEditing.value && hasCamera.value) {
const wasScanning = isScanning.value && !isPaused.value;
if (wasScanning) {
stopScanning();
}

await startCamera();

if (wasScanning) {
startScanning();
}
}
});

// Actions
const startScan = () => {
if (!isEditing.value) {
startScanning();
}
};

const stopScan = () => {
if (!isEditing.value) {
stopScanning();
}
};

const resetScanner = () => {
if (!isEditing.value) {
lastResult.value = '';
setScannedValue('');
}
};

return {
// Refs
video,
canvas,
videoContainer, // Make sure this is included
flashOverlay,   // Make sure this is included
// State
isScanning,
isPaused,
hasCamera,
cameraErrorMessage,
availableCameras,
lastResult,
scannedValue,

// Computed
containerStyle,
showControls,
showScanline,
showLastResult,

// New properties
scanRegionEnabled,
scanRegionSize,
scanRegionBorderColor,
scanRegionBorderWidth,
scanRegionStyle,

// Methods
startScanning,
stopScanning,
toggleScanning,
switchCamera,
startScan,
stopScan,
resetScanner,
requestCameraPermission, // Add this line

// Editor state
isEditing
};
}
};
</script>

<style lang="scss" scoped>
.qr-scanner-container {
position: relative;
width: 100%;
height: 100%;
min-height: 200px;
display: flex;
flex-direction: column;
overflow: hidden;
}

.video-container {
position: relative;
height: 50vh;
border: 3px solid #DDDDDF;
border-radius: 8px;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
background-color: #000;
padding: 20px;
}

.scanner-video {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;

&.scanning {
animation: scanning-pulse 2s infinite;
}
}

.scanner-canvas {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: none; // Hide canvas but keep it in the DOM for processing
}

.flash-overlay {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 255, 0, 0.3);
opacity: 0;
pointer-events: none;
transition: opacity 0.3s ease;
}

.scan-line {
position: absolute;
width: 100%;
height: 2px;
background-color: #0def6a;
box-shadow: 0 0 8px rgba(255, 0, 0, 0.9);
animation: scan-animation 2s infinite;
}

.camera-error {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.7);
color: white;
text-align: center;
padding: 20px;
}

.error-message {
background-color: rgba(255, 0, 0, 0.7);
padding: 10px 15px;
border-radius: 4px;
max-width: 80%;
}

.last-result {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
background-color: transparent;
color: white;
padding: 8px 12px;
font-size: 14px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.scanner-controls {
display: flex;
justify-content: center;
gap: 10px;
padding: 10px;
background-color: transparent;
}

button {
padding: 8px 16px;
border: none;
border-radius: 8px;
background-color: #0def6a;
color: black;
cursor: pointer;
font-size: 14px;
transition: background-color 0.2s;

&:hover {
background-color: #2afc85;
}

&:active {
background-color: #2afc85;
}
}

.scan-region {
box-sizing: border-box;
pointer-events: none;
z-index: 10;
opacity: 100;
visibility: 100;
position: relative;
}

.scan-region-corner {
position: absolute;
width: 20px;
height: 20px;
border-color: white;
border-style: solid;
border-width: 0;
}

.top-left {
top: 0;
left: 0;
border-top-width: 3px;
border-left-width: 3px;
}

.top-right {
top: 0;
right: 0;
border-top-width: 3px;
border-right-width: 3px;
}

.bottom-left {
bottom: 0;
left: 0;
border-bottom-width: 3px;
border-left-width: 3px;
}

.bottom-right {
bottom: 0;
right: 0;
border-bottom-width: 3px;
border-right-width: 3px;
}

@keyframes scan-animation {
0% {
top: 0;
}
50% {
top: 100%;
}
50.1% {
top: 0;
}
100% {
top: 100%;
}
}

@keyframes scanning-pulse {
0% {
opacity: 1;
}
50% {
opacity: 0.8;
}
100% {
opacity: 1;
}
}
</style>