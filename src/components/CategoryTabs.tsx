import { Category } from "../types";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

export const CategoryTabs = ({ categories, activeCategory, onChange }: CategoryTabsProps) => (
  <div className="sticky top-[65px] z-30 -mx-4 border-b border-orange-100 bg-[#fffaf5]/95 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:bg-white">
    <div className="scrollbar-hide flex gap-2 overflow-x-auto">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
          activeCategory === "all" ? "bg-ember-600 text-white" : "bg-white text-stone-700 hover:bg-ember-50"
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
            activeCategory === category.id ? "bg-ember-600 text-white" : "bg-white text-stone-700 hover:bg-ember-50"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>
);
