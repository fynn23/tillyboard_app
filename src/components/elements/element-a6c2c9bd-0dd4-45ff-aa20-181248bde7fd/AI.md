---
name: qr-code-scanner
description: A high-performance QR code scanner component that uses the device camera to detect and decode QR codes with visual feedback, result display, and customizable scan region
keywords: qr code, scanner, camera, barcode, reader, scan, flash, region, area
---

#### QR Code Scanner

Properties:
- `scanFrequency`: `number` - Scanning frequency in milliseconds. Lower values scan more frequently but use more resources. Default: `500`
- `preferredCamera`: `'environment' | 'user'` - Which camera to use by default. 'environment' is typically the back camera, 'user' is the front camera. Default: `'environment'`
- `showControls`: `boolean` - Whether to show camera control buttons. Default: `true`
- `showScanline`: `boolean` - Whether to show the animated scanning line. Default: `true`
- `showLastResult`: `boolean` - Whether to show the last scanned result at the bottom of the scanner. Default: `true`
- `showCameraPreview`: `boolean` - Whether to show a separate camera preview window. Default: `false`
- `autoStart`: `boolean` - Whether to automatically start scanning when component loads. Default: `true`
- `backgroundColor`: `string` - Background color for the scanner container. Default: `'transparent'`
- `borderRadius`: `string` - Border radius for the scanner container. Default: `'0px'`
- `scanRegionEnabled`: `boolean` - Whether to scan only a specific region of the camera view. Default: `false`
- `scanRegionSize`: `number` - Size of the scan region as percentage of the camera view (10-90). Default: `50`
- `scanRegionBorderColor`: `string` - Border color for the scan region indicator. Default: `'#FF0000'`
- `scanRegionBorderWidth`: `number` - Border width for the scan region indicator in pixels (1-10). Default: `2`

Events:
- `scan`: {value: string} - Triggered when a QR code is successfully scanned, with the decoded value

Actions:
- `startScan`: Starts the QR code scanning process
- `stopScan`: Pauses the QR code scanning process
- `resetScanner`: Clears the last scanned result
- `switchCamera`: Switches between available cameras (if multiple cameras are present)

Variables:
- `scannedValue`: string - Contains the most recently scanned QR code value

Special features:
- Green flash effect when a QR code is detected
- Fixed 50vh height for the scanner view
- Continuous scanning without interruption
- Camera permission request button when no camera is found or access is denied
- Customizable scan region to focus on specific areas of the camera view
- Enhanced scan region visibility with camera-like corner markers
- Visual indicators showing the active scan region with white corner brackets
- Improved scan region design that mimics professional camera viewfinders