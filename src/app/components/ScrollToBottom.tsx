"use client";

import { useEffect, useRef } from "react";

export default function ScrollToBottom({ messageCount }: { messageCount: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll immediately on mount, and smoothly on update
    elementRef.current?.scrollIntoView({ behavior: "auto" });
    
    const timer = setTimeout(() => {
      elementRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [messageCount]);

  return <div ref={elementRef} className="h-2 w-full" />;
}
