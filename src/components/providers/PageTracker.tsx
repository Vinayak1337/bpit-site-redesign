'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';

export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const [startTime, setStartTime] = useState(Date.now());

  // Track page view
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });

      // Reset start time for page leave tracking
      setStartTime(Date.now());
    }
  }, [pathname, searchParams, posthog]);

  // Track page leave manually if needed (PostHog handles $pageleave automatically for window unload,
  // but for SPA navigation we might want a custom event or rely on PostHog's improved handling)
  useEffect(() => {
    return () => {
        if (posthog) {
            const duration = (Date.now() - startTime) / 1000;
             // Optional: Custom page leave event if standard $pageleave isn't granular enough for SPA transitions
             // posthog.capture('page_leave_custom', { duration, path: pathname });
        }
    };
  }, [pathname, startTime, posthog]);

  return null;
}
