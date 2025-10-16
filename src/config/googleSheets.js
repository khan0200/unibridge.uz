// Google Sheets Integration Configuration
// 
// SETUP INSTRUCTIONS:
// 1. Open Google Apps Script (script.google.com)
// 2. Create a new project and paste the code from Code.gs
// 3. Deploy as a web app with the following settings:
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the deployment URL and replace the URL below
// 5. Make sure your Google Sheet has a 'Leads' sheet or it will be created automatically

export const GOOGLE_SCRIPT_CONFIG = {
  // Using the same Web App URL as the contact form
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbz1QNh2BqHp03QS7UvwcJ8YzsJS3o-hS1J975oVddoTAZIyrk65F_gXK-sCB1ywz0Q/exec',
  
  // Default values for form submission
  DEFAULT_LEVEL: 'Bakalavr',
  
  // Timeout for requests (in milliseconds)
  REQUEST_TIMEOUT: 10000
};

// Analytics Tracking Functions
// These functions send events to Google Analytics and Meta Pixel

export const trackButtonClick = (buttonId, section) => {
  try {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'button_click', {
        button_id: buttonId,
        section: section,
        event_category: 'engagement',
        event_label: `${section}_${buttonId}`
      });
    }
    
    // Meta Pixel (Facebook)
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ButtonClick', {
        button_id: buttonId,
        section: section,
        content_name: `${section}_${buttonId}`
      });
    }
    
    // Log for debugging
    console.log('Button click tracked:', { buttonId, section });
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
};

export const trackUniversityInteraction = (universityName, action) => {
  try {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'university_interaction', {
        university_name: universityName,
        action: action,
        event_category: 'university',
        event_label: `${universityName}_${action}`
      });
    }
    
    // Meta Pixel (Facebook)
    if (typeof fbq !== 'undefined') {
      fbq('track', 'UniversityInteraction', {
        university_name: universityName,
        action: action,
        content_name: `${universityName}_${action}`
      });
    }
    
    // Log for debugging
    console.log('University interaction tracked:', { universityName, action });
  } catch (error) {
    console.error('Error tracking university interaction:', error);
  }
};

export const trackFormSubmission = (formType, formData) => {
  try {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submission', {
        form_type: formType,
        event_category: 'lead',
        event_label: formType
      });
    }
    
    // Meta Pixel (Facebook) - Lead event
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: formType,
        content_category: 'form_submission'
      });
    }
    
    // Log for debugging
    console.log('Form submission tracked:', { formType, formData });
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
};

// Helper function to submit form data to Google Sheets
export const submitToGoogleSheets = async (formData) => {
  // Use FormData format like the working contact form
  const submitData = new FormData();
  submitData.append('fullname', formData.name.trim());
  submitData.append('phone', formData.phone);
  submitData.append('level', GOOGLE_SCRIPT_CONFIG.DEFAULT_LEVEL);
  submitData.append('message', formData.message?.trim() || 'Qo\'shimcha ma\'lumot yo\'q');
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GOOGLE_SCRIPT_CONFIG.REQUEST_TIMEOUT);
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_CONFIG.WEB_APP_URL, {
      method: 'POST',
      body: submitData, // Send FormData directly without JSON headers
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Network response was not ok');
    }
    
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};