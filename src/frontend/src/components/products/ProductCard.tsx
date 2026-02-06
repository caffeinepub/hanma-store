import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import type { SwitchProduct } from '../../backend';
import OrderViaContactCTA from '../orders/OrderViaContactCTA';

interface ProductCardProps {
  product: SwitchProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <Link to="/product/$productId" params={{ productId: String(product.id) }}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link to="/product/$productId" params={{ productId: String(product.id) }}>
            <h3 className="font-semibold text-card-foreground transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          {!product.available && (
            <Badge variant="secondary" className="shrink-0">
              Out of Stock
            </Badge>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
          <OrderViaContactCTA disabled={!product.available} />
        </div>
      </div>
    </div>
  );
}
