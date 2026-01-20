"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {[{name: "All"}].concat(categories).map((category) => (
        <Button
          key={category.name}
          variant={selectedCategory === category.name ? "default" : "outline"}
          size="sm"
          className={
            selectedCategory === category.name
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "border-border hover:bg-secondary"
          }
          onClick={() => onCategoryChange(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
