import { useEffect, useRef, useState } from "react";

interface UseScrollTriggerOptions {
  threshold?: number; // How much of the element should be visible (0-1)
  rootMargin?: string; // Margin around the root
  triggerOnce?: boolean; // Whether to trigger only once
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -100px 0px", // Trigger when top of element crosses bottom of viewport
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { isVisible, elementRef };
};
