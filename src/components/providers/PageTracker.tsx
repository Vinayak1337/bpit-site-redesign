'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [startTime, setStartTime] = useState(Date.now());

  // Track page view
  useEffect(() => {
    if (pathname && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      import('posthog-js').then(({ default: posthog }) => {
        if (posthog.__loaded) {
          posthog.capture('$pageview', {
            $current_url: url
          });
        }
      });
      
      // Reset start time for page leave tracking
      setStartTime(Date.now());
    }
  }, [pathname, searchParams]);

  // Track page leave manually if needed (PostHog handles $pageleave automatically for window unload, 
  // but for SPA navigation we might want a custom event or rely on PostHog's improved handling)
  useEffect(() => {
    return () => {
        const duration = (Date.now() - startTime) / 1000;
        void duration;
        // Optional: Custom page leave event if standard $pageleave isn't granular enough for SPA transitions.
        // posthog.capture('page_leave_custom', { duration, path: pathname });
    };
  }, [pathname, startTime]);

  return null;
}
