import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full my-8 p-6 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      height: "320px",
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface WindowScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const WindowScrollStack: React.FC<WindowScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 120,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "15%",
  scaleEndPosition = "5%",
  baseScale = 0.9,
  blurAmount = 2,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(
    new Map<number, { scale: number; y: number; opacity: number }>()
  );
  const isUpdatingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return parseFloat(value as string);
    },
    []
  );

  const updateCardTransforms = useCallback(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (
      !container ||
      !scrollContainer ||
      !cardsRef.current.length ||
      isUpdatingRef.current
    )
      return;

    isUpdatingRef.current = true;

    const scrollTop = scrollContainer.scrollTop;
    const containerRect = container.getBoundingClientRect();
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    const containerTop = scrollTop;
    const containerHeight = scrollContainer.clientHeight;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );

    console.log(
      `ScrollStack: ${cardsRef.current.length} cards, scrollTop: ${scrollTop}, containerHeight: ${containerHeight}`
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd =
        containerTop + container.offsetHeight - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        const filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        if (i === 0) {
          console.log(
            `Card ${i}: translateY=${newTransform.translateY}, scale=${newTransform.scale}, blur=${newTransform.blur}, isPinned=${isPinned}`
          );
        }

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && onStackComplete) {
          onStackComplete();
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const currentTransforms = lastTransformsRef.current;
    if (!container || !scrollContainer) return;

    console.log("ScrollStack: useLayoutEffect triggered");

    // Wait for next frame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cards = Array.from(
        container.querySelectorAll(".scroll-stack-card")
      ) as HTMLElement[];
      cardsRef.current = cards;

      console.log(`ScrollStack: Found ${cards.length} cards`);

      if (cards.length === 0) {
        console.warn(
          "ScrollStack: No cards found! Check if .scroll-stack-card class is applied"
        );
        return;
      }

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          card.style.marginBottom = `${itemDistance}px`;
        }
        card.style.willChange = "transform, filter";
        card.style.transformOrigin = "top center";
        card.style.backfaceVisibility = "hidden";
        card.style.transform = "translateZ(0)";
        card.style.webkitTransform = "translateZ(0)";
        card.style.perspective = "1000px";
        card.style.webkitPerspective = "1000px";

        console.log(
          `Card ${i}: Styled with transform origin and 3D properties`
        );
      });

      // Use container scroll instead of window scroll
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      scrollContainer.addEventListener("resize", handleScroll, {
        passive: true,
      });

      console.log("ScrollStack: Event listeners attached");

      // Initial update
      updateCardTransforms();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("resize", handleScroll);
      }
      cardsRef.current = [];
      currentTransforms.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    blurAmount,
    onStackComplete,
    handleScroll,
    updateCardTransforms,
  ]);

  return (
    <div className={`relative w-full ${className}`.trim()}>
      {/* Scrollable container for the ScrollStack effect */}
      <div
        ref={scrollContainerRef}
        className="h-[80vh] overflow-y-auto scrollbar-hide"
      >
        {/* Container for the cards */}
        <div
          ref={containerRef}
          className="px-2 sm:px-4 pb-[30rem] min-h-screen relative"
          style={{ minHeight: "200vh" }}
        >
          {React.Children.map(children, (child, index) => (
            <ScrollStackItem key={index}>{child}</ScrollStackItem>
          ))}
        </div>
      </div>

      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default WindowScrollStack;
