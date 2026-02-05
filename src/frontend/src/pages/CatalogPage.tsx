import { useState, useMemo } from 'react';
import { useGetProductCatalog } from '../hooks/useQueries';
import { useCart } from '../cart/CartProvider';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/products/CategoryFilter';
import { ProductGridSkeleton } from '../components/states/LoadingSkeleton';
import ErrorState from '../components/states/ErrorState';
import { toast } from 'sonner';
import { menuCategories } from '../content/menuCategories';
import { cafe37Content } from '../content/cafe37';

export default function CatalogPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const {
    data: catalog,
    isLoading,
    error,
    refetch,
  } = useGetProductCatalog();
  const { addItem } = useCart();

  const categories = catalog?.categories ?? [];
  const allProducts = catalog?.products ?? [];

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === null) {
      return allProducts;
    }
    return allProducts.filter((product) => product.categoryId === selectedCategoryId);
  }, [allProducts, selectedCategoryId]);

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleOrderOnline = () => {
    toast.info('Online ordering coming soon! Visit us in person or call to place your order.');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState
          title="Failed to Load Menu"
          message="We couldn't load the menu. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="mb-3 font-display text-4xl font-bold">Our Menu</h1>
        <p className="text-lg text-muted-foreground">
          Explore our delicious selection · {cafe37Content.priceRange}
        </p>
        {allProducts.length === 0 && !isLoading && (
          <div className="mt-6 rounded-lg border border-secondary bg-secondary/10 p-4">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Note:</strong> Online ordering is coming soon! For now, please call us at{' '}
              <a href={cafe37Content.phoneLink} className="font-semibold text-primary hover:underline">
                {cafe37Content.phoneFormatted}
              </a>{' '}
              or visit us in person to place your order.
            </p>
          </div>
        )}
      </div>

      {!isLoading && categories.length > 0 && (
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </div>
      )}

      {isLoading ? (
        <ProductGridSkeleton />
      ) : filteredProducts.length === 0 && allProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-lg text-muted-foreground">Menu items will be available soon.</p>
          <p className="text-sm text-muted-foreground">
            In the meantime, call us at{' '}
            <a href={cafe37Content.phoneLink} className="font-semibold text-primary hover:underline">
              {cafe37Content.phoneFormatted}
            </a>{' '}
            to learn about our offerings.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No items in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
