import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetProductById } from '../hooks/useQueries';
import { useCart } from '../cart/CartProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorState from '../components/states/ErrorState';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailsPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { data: product, isLoading, error, refetch } = useGetProductById(Number(productId));
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} added to cart`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState
          title="Product not found"
          message="We couldn't find the product you're looking for."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" onClick={() => navigate({ to: '/catalog' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Menu
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-muted">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex aspect-square items-center justify-center text-muted-foreground">No image</div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {!product.available && <Badge variant="secondary">Out of stock</Badge>}
          </div>

          <p className="mb-6 text-2xl font-bold">${product.price.toFixed(2)}</p>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description || 'No description available.'}</p>
          </div>

          <div className="mt-auto">
            <Button onClick={handleAddToCart} disabled={!product.available} size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.available ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
