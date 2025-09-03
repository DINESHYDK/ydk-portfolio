import React, { useRef, useEffect, useCallback, useState } from "react";

interface StarfieldBackgroundProps {
  starCount?: number;
  starColor?: string;
  speed?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
  starCount = 1500,
  starColor = "white",
  speed = 0.02,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [actualStarCount, setActualStarCount] = useState(starCount);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Performance monitoring
  const performanceRef = useRef({
    frameCount: 0,
    lastTime: 0,
    fps: 60,
  });

  // Initialize stars
  const initializeStars = useCallback(
    (_width: number, _height: number, count: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const star: Star = {
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * 1000 + 1,
          prevX: 0,
          prevY: 0,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        };
        star.prevX = star.x;
        star.prevY = star.y;
        stars.push(star);
      }
      return stars;
    },
    []
  );

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  // Performance monitoring function
  const monitorPerformance = useCallback(
    (currentTime: number) => {
      const perf = performanceRef.current;
      perf.frameCount++;

      if (currentTime - perf.lastTime >= 1000) {
        perf.fps = perf.frameCount;
        perf.frameCount = 0;
        perf.lastTime = currentTime;

        // Adjust star count based on performance
        if (perf.fps < 30 && !isLowPerformance) {
          setIsLowPerformance(true);
          setActualStarCount(Math.min(800, actualStarCount));
        } else if (perf.fps > 50 && isLowPerformance) {
          setIsLowPerformance(false);
          setActualStarCount(starCount);
        }
      }
    },
    [isLowPerformance, actualStarCount, starCount]
  );

  // Animation loop
  const animate = useCallback(
    (currentTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      monitorPerformance(currentTime);

      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const stars = starsRef.current;

      stars.forEach((star) => {
        // Store previous position for trail effect
        star.prevX = star.x;
        star.prevY = star.y;

        // Move star towards camera
        star.z -= speed * 100;

        // Reset star if it's too close
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1000;
          star.opacity = Math.random() * 0.8 + 0.2;
        }

        // Apply mouse influence
        const mouseInfluence = 0.0001;
        star.x += mouse.x * mouseInfluence * star.z;
        star.y += mouse.y * mouseInfluence * star.z;

        // Project 3D position to 2D screen
        const x = (star.x / star.z) * centerX + centerX;
        const y = (star.y / star.z) * centerY + centerY;

        // Calculate star size based on distance
        const size = (1 - star.z / 1000) * 3;

        // Calculate twinkling effect
        const twinkle =
          Math.sin(currentTime * star.twinkleSpeed + star.twinkleOffset) * 0.3 +
          0.7;
        const opacity = star.opacity * twinkle * (1 - star.z / 1000);

        // Only draw if star is on screen
        if (x >= 0 && x <= width && y >= 0 && y <= height && size > 0) {
          // Draw star trail
          const prevX = (star.prevX / star.z) * centerX + centerX;
          const prevY = (star.prevY / star.z) * centerY + centerY;

          if (Math.abs(x - prevX) > 1 || Math.abs(y - prevY) > 1) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = size * 0.5;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          // Draw star
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect for brighter stars
          if (opacity > 0.7) {
            ctx.shadowColor = starColor;
            ctx.shadowBlur = size * 2;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    },
    [speed, starColor, monitorPerformance]
  );

  // Setup canvas and initialize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize stars
    starsRef.current = initializeStars(
      canvas.width,
      canvas.height,
      actualStarCount
    );

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [actualStarCount, initializeStars, handleMouseMove, animate]);

  // Update stars when count changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    starsRef.current = initializeStars(
      canvas.width,
      canvas.height,
      actualStarCount
    );
  }, [actualStarCount, initializeStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: "transparent",
      }}
    />
  );
};

export default StarfieldBackground;
