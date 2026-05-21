'use client';

import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let isMounted = true;
    let posthogClient: typeof import('posthog-js').default | null = null;

    const setupPostHog = async () => {
      if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

      const { default: posthog } = await import('posthog-js');
      if (!isMounted) return;

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: ph => {
          if (process.env.NODE_ENV === 'development') ph.debug();
        },
        capture_pageview: false,
        capture_pageleave: true
      });

      posthogClient = posthog;
    };

    setupPostHog();

    // Global click listener for data-ph-event attributes
    const handleGlobalClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackedElement = target.closest('[data-ph-event]') as HTMLElement;

      if (trackedElement) {
        const posthog = posthogClient ?? (await import('posthog-js')).default;
        if (!posthog.__loaded) return;

        const eventName = trackedElement.getAttribute('data-ph-event');
        const dataStr = trackedElement.getAttribute('data-ph-data');
        let properties = {};

        if (dataStr) {
          try {
            properties = JSON.parse(dataStr);
          } catch (err) {
            console.error('Failed to parse tracking data', err);
          }
        }

        if (eventName) {
          posthog.capture(eventName, properties);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      isMounted = false;
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return <>{children}</>;
}
