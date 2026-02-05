import { useState, useMemo } from 'react';
import { useGetProductCatalog } from '../hooks/useQueries';
import { useCart } from '../cart/CartProvider';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/products/CategoryFilter';
import { ProductGridSkeleton } from '../components/states/LoadingSkeleton';
import ErrorState from '../components/states/ErrorState';
import { toast } from 'sonner';

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

  // Filter products by selected category on the client side
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState
          title="Failed to Load Catalog"
          message="We couldn't load the product catalog. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Our Menu</h1>
        <p className="text-muted-foreground">Browse our selection of premium quality products</p>
      </div>

      {!isLoading && categories.length > 0 && (
        <div className="mb-8">
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
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No products available at the moment.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No products in this category.</p>
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
