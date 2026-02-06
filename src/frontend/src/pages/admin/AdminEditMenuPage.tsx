import { useState } from 'react';
import { UtensilsCrossed, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  useGetMenu,
  useAdminSeedMenuItems,
} from '../../hooks/useQueries';
import { TableSkeleton } from '../../components/states/LoadingSkeleton';
import ErrorState from '../../components/states/ErrorState';
import { toast } from 'sonner';

export default function AdminEditMenuPage() {
  const { data: menu = [], isLoading, error, refetch } = useGetMenu();
  const seedMenuItems = useAdminSeedMenuItems();

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSeed = async () => {
    try {
      await seedMenuItems.mutateAsync();
      toast.success('Menu items seeded successfully');
    } catch (error) {
      toast.error('Failed to seed menu items');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <TableSkeleton rows={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <ErrorState
          title="Failed to load menu"
          message="We couldn't load the menu data. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const categoryNames = menu.map((cat) => cat.name);
  const currentCategory = menu.find((cat) => cat.name === selectedCategory);
  const items = currentCategory?.items || [];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">View Seeded Menu</h1>
          <p className="text-muted-foreground">Preview seeded menu data for testing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSeed} disabled={seedMenuItems.isPending}>
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            {seedMenuItems.isPending ? 'Seeding...' : 'Seed Menu Data'}
          </Button>
        </div>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Public Menu Syncs from Categories & Products</AlertTitle>
        <AlertDescription>
          The public website menu now automatically syncs from the Categories and Products you manage in the admin dashboard.
          To update the public menu, use the <strong>Categories</strong> page to create/rename/delete categories, and the <strong>Products</strong> page to add/edit items and assign them to categories.
          This page shows legacy seeded menu data for testing purposes only.
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <Label htmlFor="category-select" className="mb-2 block">
          Select Category
        </Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="Choose a category to view" />
          </SelectTrigger>
          <SelectContent>
            {categoryNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div className="rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No items in this category.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={`${selectedCategory}-${index}`} className="hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-sm max-w-xs truncate">{item.description}</td>
                      <td className="px-6 py-4 text-sm">₹{item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        {item.available ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!selectedCategory && (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center">
          <UtensilsCrossed className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Select a Category</h3>
          <p className="text-muted-foreground">
            Choose a category from the dropdown above to view its menu items.
          </p>
        </div>
      )}
    </div>
  );
}
