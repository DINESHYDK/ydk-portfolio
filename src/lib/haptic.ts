/**
 * Haptic feedback utility for mobile devices
 * Provides tactile feedback for user interactions
 */

export type HapticIntensity = "light" | "medium" | "heavy";

/**
 * Triggers haptic feedback on supported devices
 * @param intensity - The intensity of the haptic feedback
 * @param duration - Duration in milliseconds (default: 300ms)
 */
export const triggerHaptic = (
  intensity: HapticIntensity = "medium",
  duration: number = 300
): void => {
  // Check if the device supports haptic feedback
  if (!("vibrate" in navigator)) {
    return;
  }

  // Check if we're on a mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (!isMobile) {
    return;
  }

  try {
    // Map intensity to vibration patterns
    const intensityMap: Record<HapticIntensity, number[]> = {
      light: [50],
      medium: [duration],
      heavy: [duration, 50, duration * 0.5],
    };

    const pattern = intensityMap[intensity];
    navigator.vibrate(pattern);
  } catch (error) {
    // Silently handle errors - haptic feedback is not critical
    console.debug("Haptic feedback failed:", error);
  }
};

/**
 * Convenience function for button press haptic feedback
 */
export const hapticButtonPress = (): void => {
  triggerHaptic("light", 100);
};

/**
 * Convenience function for navigation haptic feedback
 */
export const hapticNavigation = (): void => {
  triggerHaptic("light", 80);
};

/**
 * Convenience function for success action haptic feedback
 */
export const hapticSuccess = (): void => {
  triggerHaptic("light", 120);
};

/**
 * Convenience function for error/warning haptic feedback
 */
export const hapticError = (): void => {
  triggerHaptic("light", 60);
};

/**
 * Convenience function for subtle notification haptic feedback
 */
export const hapticNotification = (): void => {
  triggerHaptic("light", 80);
};

/**
 * Convenience function for strong confirmation haptic feedback
 */
export const hapticConfirmation = (): void => {
  triggerHaptic("light", 100);
};

/**
 * Hook for haptic feedback in React components
 */
export const useHaptic = () => {
  return {
    triggerHaptic,
    buttonPress: hapticButtonPress,
    navigation: hapticNavigation,
    success: hapticSuccess,
    error: hapticError,
    notification: hapticNotification,
    confirmation: hapticConfirmation,
  };
};
