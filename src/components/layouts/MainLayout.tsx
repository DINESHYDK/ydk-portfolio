/**
 * MainLayout Component
 * Main application layout
 */

import React from "react";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">{children}</div>
  );
};

export default MainLayout;
