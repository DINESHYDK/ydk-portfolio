import React, { useState, useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

// Main App Router Component
const AppRouter = () => {
  // Handle global keyboard shortcuts
  useEffect(() => {
    // Prevent browser scroll restoration on reload/back
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration =
        "manual" as typeof window.history.scrollRestoration;
    }

    // On first mount, always start at top and strip any hash
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
      } catch (error) {
        // Silently handle scroll errors in case of browser restrictions
        console.debug("Scroll reset failed:", error);
      }
    });
  }, []);

  return (
    <>
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
