import React, { ReactNode, useEffect, useRef } from "react";

// Визначте тип пропсів
interface ObserverProps {
  children: ReactNode;
  onContentEndVisible: () => void;
}

// Використовуйте визначений тип для пропсів
export function Observer({ children, onContentEndVisible }: ObserverProps) {
  // Використовуйте правильний тип для useRef, вказуючи, що це елемент div
  const endContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Використовуйте правильний тип для options,
    // які вказані в IntersectionObserverInit
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      {/* Використовуйте endContentRef з правильним типом */}
      <div ref={endContentRef} />
    </div>
  );
}
