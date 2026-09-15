"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Google's map embed pulls ~500KB across ~17 requests. `loading="lazy"` does
 * not actually hold it back here — Chrome's lazy-iframe threshold is wide
 * enough that it loads on page open — so the iframe is only mounted once the
 * map genuinely scrolls into view.
 */
const EventMap = ({ location }: { location: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="h-[300px] w-full bg-surface-3">
      {shouldLoad ? (
        <iframe
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${location}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
          className="block h-[300px] w-full"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <MapPin aria-hidden className="size-8 text-brand/30" />
          <span className="sr-only">Map of {location}, loading</span>
        </div>
      )}
    </div>
  );
};

export default EventMap;
