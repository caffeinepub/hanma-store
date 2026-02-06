import { Button } from '@/components/ui/button';
import type { SwitchCategory } from '../../backend';

interface CategoryFilterProps {
  categories: SwitchCategory[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryId === null ? 'default' : 'outline'}
        onClick={() => onSelectCategory(null)}
        size="sm"
      >
        All Items
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category.id)}
          size="sm"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
