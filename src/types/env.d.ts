// src/types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GA4_ID: string,
      NEXT_PUBLIC_GTM_ID: string;
      NEXT_PUBLIC_CLARITY_ID: string;
      NEXT_PUBLIC_HOTJAR_ID: string;
      NEXT_PUBLIC_HOTJAR_SV: string;
      NEXT_PUBLIC_NORTON_SITE_VERIFICATION: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }

  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: {
        page_path: string;
        page_title: string;
        page_location: string;
        [key: string]: string;
      }
    ) => void;
  }
}

export { };