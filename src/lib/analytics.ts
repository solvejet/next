// src/lib/analytics.ts

type EventParams = Record<string, string | number | boolean | undefined>;

interface TrackEventOptions {
  eventName: string;
  eventParams?: EventParams;
  clarityEvent?: boolean;
  hotjarEvent?: boolean;
}

interface UserIdentityParams {
  userId?: string;
  email?: string;
  name?: string;
  attributes?: Record<string, string | number | boolean>;
}

// Initialize dataLayer
export const initDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

// Push event to all analytics platforms
export const trackEvent = ({
  eventName,
  eventParams = {},
  clarityEvent = true,
  hotjarEvent = true
}: TrackEventOptions) => {
  try {
    // Push to GTM dataLayer
    window.dataLayer?.push({
      event: eventName,
      ...eventParams,
    });

    // Track in Clarity if enabled
    if (clarityEvent && window.clarity) {
      window.clarity("track", eventName, eventParams);
    }

    // Track in Hotjar if enabled
    if (hotjarEvent && window.hj) {
      window.hj('event', eventName);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Identify user across platforms
export const identifyUser = (params: UserIdentityParams) => {
  try {
    // Identify in GTM
    window.dataLayer?.push({
      event: 'identify_user',
      user_id: params.userId,
      user_email: params.email,
      user_name: params.name,
      ...params.attributes,
    });

    // Identify in Clarity
    if (window.clarity) {
      window.clarity("identify", {
        userId: params.userId,
        name: params.name,
        email: params.email,
        ...params.attributes,
      });
    }

    // Identify in Hotjar
    if (window.hj) {
      window.hj('identify', params.userId, {
        email: params.email,
        name: params.name,
        ...params.attributes,
      });
    }
  } catch (error) {
    console.error('Error identifying user:', error);
  }
};

// Track page view
export const trackPageView = (url: string) => {
  trackEvent({
    eventName: 'pageview',
    eventParams: {
      page_path: url,
      page_title: document.title,
    },
  });
};

// Pre-defined event tracking functions
export const trackUserEngagement = {
  // Form interactions
  formStart: (formId: string) => {
    trackEvent({
      eventName: 'form_start',
      eventParams: { form_id: formId },
    });
  },

  formSubmit: (formId: string, formData: Record<string, unknown>) => {
    trackEvent({
      eventName: 'form_submit',
      eventParams: {
        form_id: formId,
        ...formData,
      },
    });
  },

  formError: (formId: string, errorMessage: string) => {
    trackEvent({
      eventName: 'form_error',
      eventParams: {
        form_id: formId,
        error_message: errorMessage,
      },
    });
  },

  // Button clicks
  buttonClick: (buttonId: string, buttonText: string) => {
    trackEvent({
      eventName: 'button_click',
      eventParams: {
        button_id: buttonId,
        button_text: buttonText,
      },
    });
  },

  // Scroll depth
  scrollDepth: (depth: number) => {
    trackEvent({
      eventName: 'scroll_depth',
      eventParams: {
        depth_percentage: depth,
      },
    });
  },

  // File downloads
  fileDownload: (fileUrl: string, fileName: string, fileType: string) => {
    trackEvent({
      eventName: 'file_download',
      eventParams: {
        file_url: fileUrl,
        file_name: fileName,
        file_type: fileType,
      },
    });
  },

  // External links
  outboundLink: (url: string, linkText: string) => {
    trackEvent({
      eventName: 'outbound_link_click',
      eventParams: {
        link_url: url,
        link_text: linkText,
      },
    });
  },

  // Video interactions
  videoStart: (videoId: string, videoTitle: string) => {
    trackEvent({
      eventName: 'video_start',
      eventParams: {
        video_id: videoId,
        video_title: videoTitle,
      },
    });
  },

  videoProgress: (videoId: string, progress: number) => {
    trackEvent({
      eventName: 'video_progress',
      eventParams: {
        video_id: videoId,
        progress_percentage: progress,
      },
    });
  },

  videoComplete: (videoId: string) => {
    trackEvent({
      eventName: 'video_complete',
      eventParams: {
        video_id: videoId,
      },
    });
  },
};

// Type declarations for global objects
declare global {
  interface Window {
    dataLayer: unknown[];
    clarity: (command: string, ...args: unknown[]) => void;
    hj: {
      (command: string, ...args: unknown[]): void;
      q?: unknown[];
    };
    _hjSettings: {
      hjid: number;
      hjsv: number;
    };
  }
}