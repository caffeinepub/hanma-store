import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../../backend';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div
        className="aspect-square cursor-pointer overflow-hidden bg-muted"
        onClick={() => navigate({ to: '/product/$productId', params: { productId: String(product.id) } })}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3
            className="cursor-pointer font-semibold leading-tight transition-colors hover:text-foreground/80"
            onClick={() => navigate({ to: '/product/$productId', params: { productId: String(product.id) } })}
          >
            {product.name}
          </h3>
          {!product.available && (
            <Badge variant="secondary" className="shrink-0">
              Out of stock
            </Badge>
          )}
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.available}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
