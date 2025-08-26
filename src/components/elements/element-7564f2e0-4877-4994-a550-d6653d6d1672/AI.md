---
name: vcard-generator
description: A comprehensive form component that generates and downloads vCard files with complete contact information
keywords: vcard, contact, download, form, generator, email, phone, address, organization, business card
---

#### vCard Generator

Properties:
- `namePlaceholder`: `string` - Placeholder text for the name input field. Default: `'Enter your name'`
- `emailPlaceholder`: `string` - Placeholder text for the email input field. Default: `'Enter your email'`
- `phoneWorkPlaceholder`: `string` - Placeholder text for the work phone input field. Default: `'Enter work phone'`
- `phoneHomePlaceholder`: `string` - Placeholder text for the home phone input field. Default: `'Enter home phone'`
- `phoneMobilePlaceholder`: `string` - Placeholder text for the mobile phone input field. Default: `'Enter mobile phone'`
- `organizationPlaceholder`: `string` - Placeholder text for the organization input field. Default: `'Enter company or organization'`
- `titlePlaceholder`: `string` - Placeholder text for the job title input field. Default: `'Enter job title'`
- `websitePlaceholder`: `string` - Placeholder text for the website input field. Default: `'Enter website URL'`
- `streetPlaceholder`: `string` - Placeholder text for the street input field. Default: `'Enter street address'`
- `cityPlaceholder`: `string` - Placeholder text for the city input field. Default: `'Enter city'`
- `statePlaceholder`: `string` - Placeholder text for the state/province input field. Default: `'Enter state or province'`
- `postalCodePlaceholder`: `string` - Placeholder text for the postal code input field. Default: `'Enter postal code'`
- `countryPlaceholder`: `string` - Placeholder text for the country input field. Default: `'Enter country'`
- `notePlaceholder`: `string` - Placeholder text for the notes textarea. Default: `'Enter additional notes'`
- `buttonText`: `string` - Text displayed on the generate button. Default: `'Generate vCard'`
- `initialName`: `string` - Initial value for the name input field. Default: `''`
- `initialEmail`: `string` - Initial value for the email input field. Default: `''`
- `initialPhoneWork`: `string` - Initial value for the work phone input field. Default: `''`
- `initialPhoneHome`: `string` - Initial value for the home phone input field. Default: `''`
- `initialPhoneMobile`: `string` - Initial value for the mobile phone input field. Default: `''`
- `initialOrganization`: `string` - Initial value for the organization input field. Default: `''`
- `initialTitle`: `string` - Initial value for the job title input field. Default: `''`
- `initialWebsite`: `string` - Initial value for the website input field. Default: `''`
- `initialStreet`: `string` - Initial value for the street input field. Default: `''`
- `initialCity`: `string` - Initial value for the city input field. Default: `''`
- `initialState`: `string` - Initial value for the state/province input field. Default: `''`
- `initialPostalCode`: `string` - Initial value for the postal code input field. Default: `''`
- `initialCountry`: `string` - Initial value for the country input field. Default: `''`
- `initialNote`: `string` - Initial value for the notes textarea. Default: `''`
- `buttonColor`: `string` - Background color of the generate button. Default: `'#4a90e2'`
- `buttonTextColor`: `string` - Text color of the generate button. Default: `'#ffffff'`

Events:
- `vCardGenerated`: {name: string, email: string, phoneWork: string, phoneHome: string, phoneMobile: string, organization: string, title: string, website: string, address: {street: string, city: string, state: string, postalCode: string, country: string}, note: string} - Triggered when a vCard is successfully generated and downloaded
- `validationFailed`: {errors: {name: string, email: string}} - Triggered when form validation fails
- `error`: {error: string} - Triggered when an error occurs during vCard generation

Actions:
- `resetForm`: Clears all form fields and resets validation state

Variables:
- `formData`: object - Contains the current values of all form fields
- `isValid`: boolean - Indicates whether the current form values pass validation

Special features:
- Validates name is not empty
- Validates email format using regex pattern
- Generates standard vCard format (VERSION:3.0)
- Supports all standard vCard fields (name, email, phones, organization, title, website, address, notes)
- Automatically downloads the generated vCard file
- Shows validation errors inline
- Provides status messages for user feedback
- Responsive design that adapts to container width
- Organized form sections for better user experience