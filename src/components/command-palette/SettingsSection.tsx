/**
 * SettingsSection Component
 * Profile and configuration options for the command palette
 */

import React from "react";
import { User, Settings, Moon, Sun, Keyboard, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { getShortcutDisplay } from "@/lib/command-palette-utils";

interface SettingItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  shortcut?: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon: IconComponent,
  label,
  description,
  shortcut,
  onClick,
  isActive = false,
  className,
}) => (
  <button
    className={cn(
      // Base styles
      "w-full",
      "flex items-center gap-3",
      "px-3 py-2.5",
      "text-left",
      "rounded-lg",
      "transition-all duration-150 ease-out",
      "group",

      // Default state
      "text-cp-text-primary",
      "hover:bg-cp-hover",
      "hover:text-cp-text-primary",

      // Active state
      isActive && [
        "bg-cp-success/10",
        "text-cp-success",
        "ring-1 ring-cp-success/20",
      ],

      // Focus styles
      "focus:outline-none",
      "focus:ring-2 focus:ring-cp-focus/50",
      "focus:ring-offset-2 focus:ring-offset-cp-surface",

      className
    )}
    onClick={onClick}
    type="button"
  >
    {/* Icon */}
    <div
      className={cn(
        "flex-shrink-0",
        "w-4 h-4",
        "transition-colors duration-150",
        isActive ? "text-cp-success" : "text-cp-text-secondary",
        "group-hover:text-cp-text-primary"
      )}
    >
      <IconComponent />
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="font-medium text-sm">{label}</div>
      {description && (
        <div className="text-xs text-cp-text-secondary mt-0.5 truncate">
          {description}
        </div>
      )}
    </div>

    {/* Keyboard Shortcut */}
    {shortcut && (
      <div className="flex-shrink-0">
        <kbd
          className={cn(
            "px-1.5 py-0.5",
            "text-[10px] font-mono",
            "rounded",
            "transition-colors duration-150",
            isActive
              ? "bg-cp-success/20 text-cp-success"
              : "bg-cp-border/50 text-cp-text-secondary",
            "group-hover:bg-cp-hover group-hover:text-cp-text-primary"
          )}
        >
          {getShortcutDisplay(shortcut)}
        </kbd>
      </div>
    )}
  </button>
);

interface ProfileItemProps {
  name?: string;
  title?: string;
  avatarUrl?: string;
  status?: string;
  onClick?: () => void;
  className?: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  name = "Y. Dinesh Krishna",
  title = "AI & Software Development",
  avatarUrl = "/DineshProfile.png",
  status = "Available for work",
  onClick,
  className,
}) => (
  <button
    className={cn(
      // Base styles
      "w-full",
      "flex items-center gap-3",
      "px-3 py-3",
      "text-left",
      "rounded-lg",
      "transition-all duration-150 ease-out",
      "group",

      // Default state
      "text-cp-text-primary",
      "hover:bg-cp-hover",
      "hover:text-cp-text-primary",

      // Focus styles
      "focus:outline-none",
      "focus:ring-2 focus:ring-cp-focus/50",
      "focus:ring-offset-2 focus:ring-offset-cp-surface",

      className
    )}
    onClick={onClick}
    type="button"
  >
    {/* Avatar */}
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full overflow-hidden border border-cp-border/50">
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>
    </div>

    {/* Profile Info */}
    <div className="flex-1 min-w-0">
      <div className="font-medium text-sm truncate">{name}</div>
      <div className="text-xs text-cp-text-secondary truncate">{title}</div>
      <div className="text-xs text-cp-success mt-0.5 truncate">{status}</div>
    </div>

    {/* Profile indicator */}
    <div className="flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-cp-success animate-pulse" />
    </div>
  </button>
);

interface SettingsSectionProps {
  onProfileClick?: () => void;
  onThemeToggle?: () => void;
  onKeyboardShortcuts?: () => void;
  onPreferences?: () => void;
  currentTheme?: "dark" | "light" | "system";
  className?: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  onProfileClick,
  onThemeToggle,
  onKeyboardShortcuts,
  onPreferences,
  currentTheme = "dark",
  className,
}) => {
  const getThemeIcon = () => {
    switch (currentTheme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      default:
        return Palette;
    }
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case "light":
        return "Switch to Dark";
      case "dark":
        return "Switch to Light";
      default:
        return "Theme Settings";
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      {/* Profile Section */}
      <div className="px-3 py-1.5">
        <h3 className="text-xs font-semibold text-cp-text-secondary uppercase tracking-wider">
          Profile
        </h3>
      </div>

      <ProfileItem onClick={onProfileClick} />

      {/* Settings Section */}
      <div className="px-3 py-1.5 mt-4">
        <h3 className="text-xs font-semibold text-cp-text-secondary uppercase tracking-wider">
          Settings
        </h3>
      </div>

      <div className="space-y-0.5">
        <SettingItem
          icon={getThemeIcon()}
          label={getThemeLabel()}
          description={`Currently using ${currentTheme} theme`}
          shortcut="cmd+shift+t"
          onClick={onThemeToggle}
          isActive={currentTheme !== "system"}
        />

        <SettingItem
          icon={Keyboard}
          label="Keyboard Shortcuts"
          description="View and customize shortcuts"
          shortcut="cmd+/"
          onClick={onKeyboardShortcuts}
        />

        <SettingItem
          icon={Settings}
          label="Preferences"
          description="Customize your experience"
          shortcut="cmd+,"
          onClick={onPreferences}
        />
      </div>
    </div>
  );
};

export default SettingsSection;
