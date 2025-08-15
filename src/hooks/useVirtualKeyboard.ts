/**
 * Virtual Keyboard Hook
 * Handle virtual keyboard visibility on mobile devices
 */

import { useState, useEffect } from 'react';

interface VirtualKeyboardState {
  isVisible: boolean;
  height: number;
}

export function useVirtualKeyboard() {
  const [keyboardState, setKeyboardState] = useState<VirtualKeyboardState>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    // Only run on mobile devices
    if (!/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return;
    }

    let initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    let currentViewportHeight = initialViewportHeight;

    const handleViewportChange = () => {
      const newHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialViewportHeight - newHeight;
      
      // Consider keyboard visible if viewport height decreased by more than 150px
      const isKeyboardVisible = heightDifference > 150;
      
      setKeyboardState({
        isVisible: isKeyboardVisible,
        height: isKeyboardVisible ? heightDifference : 0,
      });

      currentViewportHeight = newHeight;
    };

    // Use Visual Viewport API if available (modern browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
      };
    } else {
      // Fallback for older browsers
      const handleResize = () => {
        // Delay to ensure we get the correct height after keyboard animation
        setTimeout(handleViewportChange, 100);
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Helper function to adjust element positioning when keyboard is visible
  const getKeyboardAdjustedStyle = (baseStyle: React.CSSProperties = {}): React.CSSProperties => {
    if (!keyboardState.isVisible) return baseStyle;

    return {
      ...baseStyle,
      paddingBottom: `${keyboardState.height}px`,
      transition: 'padding-bottom 0.3s ease-in-out',
    };
  };

  // Helper function to get viewport-safe height
  const getViewportSafeHeight = (): string => {
    if (keyboardState.isVisible) {
      return `calc(100vh - ${keyboardState.height}px)`;
    }
    return '100vh';
  };

  return {
    isKeyboardVisible: keyboardState.isVisible,
    keyboardHeight: keyboardState.height,
    getKeyboardAdjustedStyle,
    getViewportSafeHeight,
  };
}