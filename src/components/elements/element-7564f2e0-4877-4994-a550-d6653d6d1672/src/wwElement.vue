<template>
<div class="vcard-generator">
  <div class="form-section">
    <h3 class="section-title">Basic Information</h3>
    
    <div class="form-group">
      <label for="name">Name *</label>
      <input 
        id="name" 
        type="text" 
        v-model="nameValue" 
        :class="{ 'error': nameError && showErrors }"
        @blur="validateName"
        :placeholder="content.namePlaceholder || 'Enter your name'"
      />
      <div class="error-message" v-if="nameError && showErrors">{{ nameError }}</div>
    </div>

    <div class="form-group">
      <label for="email">Email *</label>
      <input 
        id="email" 
        type="email" 
        v-model="emailValue" 
        :class="{ 'error': emailError && showErrors }"
        @blur="validateEmail"
        :placeholder="content.emailPlaceholder || 'Enter your email'"
      />
      <div class="error-message" v-if="emailError && showErrors">{{ emailError }}</div>
    </div>
  </div>

  <div class="form-section">
    <h3 class="section-title">Phone Numbers</h3>
    
    <div class="form-group">
      <label for="phoneWork">Work Phone</label>
      <input 
        id="phoneWork" 
        type="tel" 
        v-model="phoneWorkValue" 
        :placeholder="content.phoneWorkPlaceholder || 'Enter work phone'"
      />
    </div>

    <div class="form-group">
      <label for="phoneHome">Home Phone</label>
      <input 
        id="phoneHome" 
        type="tel" 
        v-model="phoneHomeValue" 
        :placeholder="content.phoneHomePlaceholder || 'Enter home phone'"
      />
    </div>

    <div class="form-group">
      <label for="phoneMobile">Mobile Phone</label>
      <input 
        id="phoneMobile" 
        type="tel" 
        v-model="phoneMobileValue" 
        :placeholder="content.phoneMobilePlaceholder || 'Enter mobile phone'"
      />
    </div>
  </div>

  <div class="form-section">
    <h3 class="section-title">Professional Information</h3>
    
    <div class="form-group">
      <label for="organization">Company/Organization</label>
      <input 
        id="organization" 
        type="text" 
        v-model="organizationValue" 
        :placeholder="content.organizationPlaceholder || 'Enter company or organization'"
      />
    </div>

    <div class="form-group">
      <label for="title">Job Title</label>
      <input 
        id="title" 
        type="text" 
        v-model="titleValue" 
        :placeholder="content.titlePlaceholder || 'Enter job title'"
      />
    </div>

    <div class="form-group">
      <label for="website">Website</label>
      <input 
        id="website" 
        type="url" 
        v-model="websiteValue" 
        :placeholder="content.websitePlaceholder || 'Enter website URL'"
      />
    </div>
  </div>

  <div class="form-section">
    <h3 class="section-title">Address</h3>
    
    <div class="form-group">
      <label for="street">Street</label>
      <input 
        id="street" 
        type="text" 
        v-model="streetValue" 
        :placeholder="content.streetPlaceholder || 'Enter street address'"
      />
    </div>

    <div class="form-row">
      <div class="form-group half">
        <label for="city">City</label>
        <input 
          id="city" 
          type="text" 
          v-model="cityValue" 
          :placeholder="content.cityPlaceholder || 'Enter city'"
        />
      </div>

      <div class="form-group half">
        <label for="postalCode">Postal Code</label>
        <input 
          id="postalCode" 
          type="text" 
          v-model="postalCodeValue" 
          :placeholder="content.postalCodePlaceholder || 'Enter postal code'"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group half">
        <label for="state">State/Province</label>
        <input 
          id="state" 
          type="text" 
          v-model="stateValue" 
          :placeholder="content.statePlaceholder || 'Enter state or province'"
        />
      </div>

      <div class="form-group half">
        <label for="country">Country</label>
        <input 
          id="country" 
          type="text" 
          v-model="countryValue" 
          :placeholder="content.countryPlaceholder || 'Enter country'"
        />
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3 class="section-title">Additional Information</h3>
    
    <div class="form-group">
      <label for="note">Notes</label>
      <textarea 
        id="note" 
        v-model="noteValue" 
        :placeholder="content.notePlaceholder || 'Enter additional notes'"
        rows="3"
      ></textarea>
    </div>
  </div>

  <button 
    class="generate-button" 
    @click="generateVCard"
    :style="{
      backgroundColor: content.buttonColor || '#4a90e2',
      color: content.buttonTextColor || '#ffffff'
    }"
  >
    {{ content.buttonText || 'Generate vCard' }}
  </button>

  <div class="status-message" v-if="statusMessage">{{ statusMessage }}</div>
</div>
</template>

<script>
import { ref, computed, watch } from 'vue';

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

    // Form values - Basic Information
    const nameValue = ref('');
    const emailValue = ref('');
    
    // Form values - Phone Numbers
    const phoneWorkValue = ref('');
    const phoneHomeValue = ref('');
    const phoneMobileValue = ref('');
    
    // Form values - Professional Information
    const organizationValue = ref('');
    const titleValue = ref('');
    const websiteValue = ref('');
    
    // Form values - Address
    const streetValue = ref('');
    const cityValue = ref('');
    const stateValue = ref('');
    const postalCodeValue = ref('');
    const countryValue = ref('');
    
    // Form values - Additional Information
    const noteValue = ref('');
    
    // Validation state
    const nameError = ref('');
    const emailError = ref('');
    const showErrors = ref(false);
    const statusMessage = ref('');

    // Internal variables for component state
    const { value: formData, setValue: setFormData } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'formData',
      type: 'object',
      defaultValue: { 
        name: '', 
        email: '',
        phoneWork: '',
        phoneHome: '',
        phoneMobile: '',
        organization: '',
        title: '',
        website: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        note: ''
      }
    });

    const { value: isValid, setValue: setIsValid } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isValid',
      type: 'boolean',
      defaultValue: false
    });

    // Watch for initial value changes - Basic Information
    watch(() => props.content.initialName, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        nameValue.value = newValue;
        validateName();
      }
    }, { immediate: true });

    watch(() => props.content.initialEmail, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        emailValue.value = newValue;
        validateEmail();
      }
    }, { immediate: true });
    
    // Watch for initial value changes - Phone Numbers
    watch(() => props.content.initialPhoneWork, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        phoneWorkValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialPhoneHome, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        phoneHomeValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialPhoneMobile, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        phoneMobileValue.value = newValue;
      }
    }, { immediate: true });
    
    // Watch for initial value changes - Professional Information
    watch(() => props.content.initialOrganization, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        organizationValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialTitle, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        titleValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialWebsite, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        websiteValue.value = newValue;
      }
    }, { immediate: true });
    
    // Watch for initial value changes - Address
    watch(() => props.content.initialStreet, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        streetValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialCity, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        cityValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialState, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        stateValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialPostalCode, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        postalCodeValue.value = newValue;
      }
    }, { immediate: true });
    
    watch(() => props.content.initialCountry, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        countryValue.value = newValue;
      }
    }, { immediate: true });
    
    // Watch for initial value changes - Additional Information
    watch(() => props.content.initialNote, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        noteValue.value = newValue;
      }
    }, { immediate: true });

    // Update form data when values change
    watch([
      nameValue, 
      emailValue, 
      phoneWorkValue, 
      phoneHomeValue, 
      phoneMobileValue,
      organizationValue,
      titleValue,
      websiteValue,
      streetValue,
      cityValue,
      stateValue,
      postalCodeValue,
      countryValue,
      noteValue
    ], ([
      newName, 
      newEmail, 
      newPhoneWork, 
      newPhoneHome, 
      newPhoneMobile,
      newOrganization,
      newTitle,
      newWebsite,
      newStreet,
      newCity,
      newState,
      newPostalCode,
      newCountry,
      newNote
    ]) => {
      setFormData({ 
        name: newName, 
        email: newEmail,
        phoneWork: newPhoneWork,
        phoneHome: newPhoneHome,
        phoneMobile: newPhoneMobile,
        organization: newOrganization,
        title: newTitle,
        website: newWebsite,
        street: newStreet,
        city: newCity,
        state: newState,
        postalCode: newPostalCode,
        country: newCountry,
        note: newNote
      });
      validateForm();
    });

    // Validation functions
    const validateName = () => {
      if (!nameValue.value || nameValue.value.trim() === '') {
        nameError.value = 'Name is required';
        return false;
      }
      nameError.value = '';
      return true;
    };

    const validateEmail = () => {
      if (!emailValue.value || emailValue.value.trim() === '') {
        emailError.value = 'Email is required';
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue.value)) {
        emailError.value = 'Please enter a valid email address';
        return false;
      }

      emailError.value = '';
      return true;
    };

    const validateForm = () => {
      const nameValid = validateName();
      const emailValid = validateEmail();
      const valid = nameValid && emailValid;
      setIsValid(valid);
      return valid;
    };

    // Generate vCard function
    const generateVCard = () => {
      if (isEditing.value) return;

      showErrors.value = true;

      if (!validateForm()) {
        statusMessage.value = 'Please fix the errors before generating the vCard';
        emit('trigger-event', {
          name: 'validationFailed',
          event: { errors: { name: nameError.value, email: emailError.value } }
        });
        return;
      }

      try {
        // Create vCard content
        const vCardLines = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${nameValue.value}`,
          `EMAIL:${emailValue.value}`
        ];
        
        // Add phone numbers if provided
        if (phoneWorkValue.value) {
          vCardLines.push(`TEL;TYPE=WORK:${phoneWorkValue.value}`);
        }
        if (phoneHomeValue.value) {
          vCardLines.push(`TEL;TYPE=HOME:${phoneHomeValue.value}`);
        }
        if (phoneMobileValue.value) {
          vCardLines.push(`TEL;TYPE=CELL:${phoneMobileValue.value}`);
        }
        
        // Add organization and title if provided
        if (organizationValue.value) {
          vCardLines.push(`ORG:${organizationValue.value}`);
        }
        if (titleValue.value) {
          vCardLines.push(`TITLE:${titleValue.value}`);
        }
        
        // Add website if provided
        if (websiteValue.value) {
          vCardLines.push(`URL:${websiteValue.value}`);
        }
        
        // Add address if any address field is provided
        if (streetValue.value || cityValue.value || stateValue.value || postalCodeValue.value || countryValue.value) {
          vCardLines.push(`ADR;TYPE=WORK:;;${streetValue.value || ''};${cityValue.value || ''};${stateValue.value || ''};${postalCodeValue.value || ''};${countryValue.value || ''}`);
        }
        
        // Add notes if provided
        if (noteValue.value) {
          vCardLines.push(`NOTE:${noteValue.value}`);
        }
        
        // End vCard
        vCardLines.push('END:VCARD');
        
        const vCardContent = vCardLines.join('\n');

        // Create blob and download link
        const blob = new Blob([vCardContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${nameValue.value.replace(/\s+/g, '_')}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        statusMessage.value = 'vCard generated successfully!';
        setTimeout(() => {
          statusMessage.value = '';
        }, 3000);

        emit('trigger-event', {
          name: 'vCardGenerated',
          event: { 
            name: nameValue.value, 
            email: emailValue.value,
            phoneWork: phoneWorkValue.value,
            phoneHome: phoneHomeValue.value,
            phoneMobile: phoneMobileValue.value,
            organization: organizationValue.value,
            title: titleValue.value,
            website: websiteValue.value,
            address: {
              street: streetValue.value,
              city: cityValue.value,
              state: stateValue.value,
              postalCode: postalCodeValue.value,
              country: countryValue.value
            },
            note: noteValue.value
          }
        });
      } catch (error) {
        statusMessage.value = 'Error generating vCard. Please try again.';
        emit('trigger-event', {
          name: 'error',
          event: { error: error.message }
        });
      }
    };

    // Reset form function
    const resetForm = () => {
      // Reset basic information
      nameValue.value = '';
      emailValue.value = '';
      
      // Reset phone numbers
      phoneWorkValue.value = '';
      phoneHomeValue.value = '';
      phoneMobileValue.value = '';
      
      // Reset professional information
      organizationValue.value = '';
      titleValue.value = '';
      websiteValue.value = '';
      
      // Reset address
      streetValue.value = '';
      cityValue.value = '';
      stateValue.value = '';
      postalCodeValue.value = '';
      countryValue.value = '';
      
      // Reset additional information
      noteValue.value = '';
      
      // Reset validation state
      nameError.value = '';
      emailError.value = '';
      showErrors.value = false;
      statusMessage.value = '';
      
      // Reset internal variables
      setFormData({ 
        name: '', 
        email: '',
        phoneWork: '',
        phoneHome: '',
        phoneMobile: '',
        organization: '',
        title: '',
        website: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        note: ''
      });
      setIsValid(false);
    };

    return {
      // Basic information
      nameValue,
      emailValue,
      
      // Phone numbers
      phoneWorkValue,
      phoneHomeValue,
      phoneMobileValue,
      
      // Professional information
      organizationValue,
      titleValue,
      websiteValue,
      
      // Address
      streetValue,
      cityValue,
      stateValue,
      postalCodeValue,
      countryValue,
      
      // Additional information
      noteValue,
      
      // Validation state
      nameError,
      emailError,
      showErrors,
      statusMessage,
      
      // Functions
      validateName,
      validateEmail,
      generateVCard,
      resetForm,
      isEditing
    };
  }
};
</script>

<style lang="scss" scoped>
.vcard-generator {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
    
    &:last-of-type {
      border-bottom: none;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: #333;
    }
  }

  .form-row {
    display: flex;
    gap: 16px;
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 8px;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    
    &.half {
      width: calc(50% - 8px);
      
      @media (max-width: 480px) {
        width: 100%;
      }
    }

    label {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    input, textarea {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.2s ease;
      width: 100%;

      &:focus {
        outline: none;
        border-color: #4a90e2;
      }

      &.error {
        border-color: #e74c3c;
      }
    }

    .error-message {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 4px;
    }
  }

  .generate-button {
    padding: 12px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s ease;
    margin-top: 8px;
    align-self: center;
    min-width: 200px;

    &:hover {
      opacity: 0.9;
    }
  }

  .status-message {
    font-size: 14px;
    margin-top: 8px;
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    background-color: #f8f9fa;
  }
}
</style>