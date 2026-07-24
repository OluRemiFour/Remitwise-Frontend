"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevKeyRef = useRef<string>("");

  useEffect(() => {
    const key = pathname + (searchParams?.toString() ?? "");
    if (prevKeyRef.current === "" || prevKeyRef.current === key) {
      prevKeyRef.current = key;
      return;
    }

    prevKeyRef.current = key;
    setActive(true);
    setProgress(0);

    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.random() * 18;
      if (current >= 95) {
        current = 95;
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setActive(false), 300);
        }, 200);
      }
      setProgress(current);
    }, 80);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pathname, searchParams]);

  if (!active) return null;

  return (
    <div className="rw-route-progress" role="progressbar" aria-label="Loading">
      <div
        className="rw-route-progress__bar"
        style={{ transform: `translateX(${progress - 100}%)` }}
      />
    </div>
  );
}
