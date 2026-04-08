'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { initPostHog } from '@/lib/posthog';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();

    // Global click listener for data-ph-event attributes
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackedElement = target.closest('[data-ph-event]') as HTMLElement;

      if (trackedElement && posthog.__loaded) {
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
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
