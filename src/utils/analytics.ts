/**
 * Google Analytics 4 & Custom Event Tracker for REFERESTATES
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(action: string, category: string = 'engagement', label?: string, value?: number) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    // Graceful debug log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Event] ${action} | Category: ${category} | Label: ${label || 'none'}`);
    }
  }
}

export function trackWhatsAppClick(source: string, propertyName?: string) {
  trackEvent('whatsapp_click', 'conversion', propertyName ? `${source}: ${propertyName}` : source);
}

export function trackBrochureDownload(propertyName: string) {
  trackEvent('brochure_download', 'lead_generation', propertyName);
}

export function trackLeadSubmission(formType: string, propertyName?: string) {
  trackEvent('generate_lead', 'conversion', propertyName ? `${formType}: ${propertyName}` : formType);
}

export function trackPhoneClick(source: string) {
  trackEvent('phone_call_click', 'conversion', source);
}
