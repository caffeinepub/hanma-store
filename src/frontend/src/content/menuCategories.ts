// NOTE: This file contains legacy menu category definitions for reference only.
// The public menu (TextMenuPage) now syncs directly from admin-managed Categories and Products.
// These hardcoded categories are no longer used for public menu rendering.

export const menuCategories = [
  { id: 'all-day-breakfast', name: 'All Day Breakfast', order: 1 },
  { id: 'drinks-soft', name: 'Drinks - Soft Corner', order: 2 },
  { id: 'drinks-hot', name: 'Drinks - Hot Corner', order: 3 },
  { id: 'soup', name: 'Soup', order: 4 },
  { id: 'starters', name: 'Starters', order: 5 },
  { id: 'sandwich-lovers', name: 'Sandwich Lovers', order: 6 },
  { id: 'burger-lovers-veg', name: 'Burger Lovers - Veg', order: 7 },
  { id: 'burger-lovers-non-veg', name: 'Burger Lovers - Non-Veg', order: 8 },
  { id: 'pizza-lovers', name: 'Pizza Lovers', order: 9 },
  { id: 'main-course-veg', name: 'Main Course - Veg', order: 10 },
  { id: 'main-course-non-veg', name: 'Main Course - Non-Veg', order: 11 },
  { id: 'main-course-rice', name: 'Main Course - Rice', order: 12 },
  { id: 'main-course-noodles', name: 'Main Course - Noodles', order: 13 },
  { id: 'main-course-continental', name: 'Main Course - Continental', order: 14 },
  { id: 'main-course-indian', name: 'Main Course - Indian', order: 15 },
  { id: 'main-course-tandoor', name: 'Main Course - Tandoor', order: 16 },
  { id: 'dessert', name: 'Dessert', order: 17 },
  { id: 'traditional-sweets', name: 'Traditional Sweets', order: 18 },
];

export const getCategoryDisplayName = (categoryName: string): string => {
  const category = menuCategories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase() || cat.id === categoryName.toLowerCase()
  );
  return category ? category.name : categoryName;
};
