export default {
  editor: {
    label: {
      en: 'vCard Generator'
    },
    icon: 'user'
  },
  properties: {
    // Basic Information
    namePlaceholder: {
      label: { en: 'Name placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter your name',
      section: 'settings',
    },
    emailPlaceholder: {
      label: { en: 'Email placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter your email',
      section: 'settings',
    },
    
    // Phone Numbers
    phoneWorkPlaceholder: {
      label: { en: 'Work phone placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter work phone',
      section: 'settings',
    },
    phoneHomePlaceholder: {
      label: { en: 'Home phone placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter home phone',
      section: 'settings',
    },
    phoneMobilePlaceholder: {
      label: { en: 'Mobile phone placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter mobile phone',
      section: 'settings',
    },
    
    // Professional Information
    organizationPlaceholder: {
      label: { en: 'Organization placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter company or organization',
      section: 'settings',
    },
    titlePlaceholder: {
      label: { en: 'Job title placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter job title',
      section: 'settings',
    },
    websitePlaceholder: {
      label: { en: 'Website placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter website URL',
      section: 'settings',
    },
    
    // Address
    streetPlaceholder: {
      label: { en: 'Street placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter street address',
      section: 'settings',
    },
    cityPlaceholder: {
      label: { en: 'City placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter city',
      section: 'settings',
    },
    statePlaceholder: {
      label: { en: 'State/Province placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter state or province',
      section: 'settings',
    },
    postalCodePlaceholder: {
      label: { en: 'Postal code placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter postal code',
      section: 'settings',
    },
    countryPlaceholder: {
      label: { en: 'Country placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter country',
      section: 'settings',
    },
    
    // Additional Information
    notePlaceholder: {
      label: { en: 'Notes placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Enter additional notes',
      section: 'settings',
    },
    
    // Button Configuration
buttonText: {
label: { en: 'Button text' },
type: 'Text',
bindable: true,
defaultValue: 'Generate vCard',
section: 'settings',
},

// Initial Values - Basic Information
initialName: {
label: { en: 'Initial name' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialEmail: {
label: { en: 'Initial email' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},

// Initial Values - Phone Numbers
initialPhoneWork: {
label: { en: 'Initial work phone' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialPhoneHome: {
label: { en: 'Initial home phone' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialPhoneMobile: {
label: { en: 'Initial mobile phone' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},

// Initial Values - Professional Information
initialOrganization: {
label: { en: 'Initial organization' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialTitle: {
label: { en: 'Initial job title' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialWebsite: {
label: { en: 'Initial website' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},

// Initial Values - Address
initialStreet: {
label: { en: 'Initial street' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialCity: {
label: { en: 'Initial city' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialState: {
label: { en: 'Initial state/province' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialPostalCode: {
label: { en: 'Initial postal code' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},
initialCountry: {
label: { en: 'Initial country' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},

// Initial Values - Additional Information
initialNote: {
label: { en: 'Initial notes' },
type: 'Text',
bindable: true,
defaultValue: '',
section: 'settings',
},

// Style Properties
buttonColor: {
label: { en: 'Button color' },
type: 'Color',
bindable: true,
defaultValue: '#4a90e2',
section: 'style',
},
buttonTextColor: {
label: { en: 'Button text color' },
type: 'Color',
bindable: true,
defaultValue: '#ffffff',
section: 'style',
}
},
triggerEvents: [
{
name: 'vCardGenerated',
label: { en: 'On vCard generated' },
event: { 
name: '', 
email: '',
phoneWork: '',
phoneHome: '',
phoneMobile: '',
organization: '',
title: '',
website: '',
address: {
street: '',
city: '',
state: '',
postalCode: '',
country: ''
},
note: ''
}
},
{
name: 'validationFailed',
label: { en: 'On validation failed' },
event: { errors: { name: '', email: '' } }
},
{
name: 'error',
label: { en: 'On error' },
event: { error: '' }
}
],
actions: [
{
action: 'resetForm',
label: { en: 'Reset form' }
}
]
};