---
name: file-downloader
description: A component that allows users to download files from URLs or generate vCard contact files with customizable fields
keywords: download, file, button, url, fetch, vcard, contact, vcf
---

#### File & vCard Downloader

Properties:
- `fileUrl`: `string` - The URL of the file to be downloaded. Default: `''`
- `fileName`: `string` - The name that will be used when saving the downloaded file. Default: `'download'`
- `downloadButtonColor`: `string` - Sets the background color of the download button. Default: `'#48c774'`
- `downloadButtonHoverColor`: `string` - Sets the background color of the download button when hovered. Default: `'#3abb67'`
- `useVCard`: `boolean` - Toggle to generate a vCard file instead of downloading from URL. Default: `true`
- `vCardFirstName`: `string` - First name for the vCard contact. Default: `'John'`
- `vCardLastName`: `string` - Last name for the vCard contact. Default: `'Doe'`
- `vCardEmail`: `string` - Email address for the vCard contact. Default: `'john.doe@example.com'`
- `vCardPhone`: `string` - Phone number for the vCard contact. Default: `'+1234567890'`
- `vCardCompany`: `string` - Company name for the vCard contact. Default: `'Example Company'`
- `vCardJobTitle`: `string` - Job title for the vCard contact. Default: `'Software Developer'`
- `vCardWebsite`: `string` - Website URL for the vCard contact. Default: `'https://example.com'`
- `vCardAddress`: `string` - Physical address for the vCard contact. Default: `'123 Main St, City, Country'`

Events:
- `downloaded`: {value: string} - Triggered when a file is successfully downloaded, with the filename as payload
- `error`: {value: string} - Triggered when an error occurs during file download, with the error message as payload

Variables:
- `downloadStatus`: string - Contains the current download status ('ready', 'downloading', 'completed', 'error')

Actions:
- `downloadFile`: Initiates the file download process

Special features:
- Dual functionality: download files from URLs or generate vCard contact files
- vCard generation with customizable contact fields (name, email, phone, company, etc.)
- Supports downloading any file type accessible via URL
- Customizable button appearance
- Error handling for failed downloads
- Download status tracking
- Compatible with dynamic file URLs and names through bindable properties