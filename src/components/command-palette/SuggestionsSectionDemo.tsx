/**
 * SuggestionsSection Demo Component
 * Demo component to test the SuggestionsSection functionality
 */

import React, { useState } from "react";
import SuggestionsSection from "./SuggestionsSection";
import SearchInput from "./SearchInput";
import { navigationItems, convertToSuggestionItems } from "@/data/navigation";

const SuggestionsSectionDemo: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Convert navigation items to suggestion items
  const suggestions = convertToSuggestionItems(navigationItems, (route) => {
    console.log("Navigate to:", route);
  });

  const handleItemSelect = (item: (typeof suggestions)[0]) => {
    console.log("Selected item:", item);
    item.action();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const filteredSuggestions = suggestions.filter(
      (item) =>
        !searchValue.trim() ||
        item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        (item.shortcut &&
          item.shortcut.toLowerCase().includes(searchValue.toLowerCase()))
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleItemSelect(filteredSuggestions[selectedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        setSearchValue("");
        setSelectedIndex(-1);
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue, selectedIndex]);

  return (
    <div className="min-h-screen bg-cp-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-cp-text-primary mb-8">
          SuggestionsSection Demo
        </h1>

        <div className="cp-container p-6 space-y-4">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Type to search suggestions..."
          />

          <SuggestionsSection
            suggestions={suggestions}
            onItemSelect={handleItemSelect}
            selectedIndex={selectedIndex}
            searchFilter={searchValue}
          />
        </div>

        <div className="mt-8 text-cp-text-secondary text-sm">
          <p>Try typing to filter suggestions, or use keyboard navigation:</p>
          <ul className="mt-2 space-y-1">
            <li>• ↑↓ to navigate</li>
            <li>• Enter to select</li>
            <li>• Escape to clear</li>
            <li>• Cmd/Ctrl + K to focus search</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsSectionDemo;
