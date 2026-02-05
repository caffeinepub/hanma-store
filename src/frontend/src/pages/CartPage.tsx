import { useCart } from '../cart/CartProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mb-3 font-display text-3xl font-bold">Your cart is empty</h1>
          <p className="mb-8 text-lg text-muted-foreground">Add some delicious items to get started</p>
          <Button size="lg" onClick={() => navigate({ to: '/catalog' })} className="shadow-glow">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-10 font-display text-4xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.product.id} className="transition-shadow hover:shadow-soft">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-bold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center text-lg font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-6">
                        <p className="text-xl font-bold text-primary">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-soft">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>
              <div className="mb-6 space-y-3 border-b border-border pb-6">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <div className="mb-8 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>
              <Button onClick={() => navigate({ to: '/checkout' })} className="w-full shadow-glow" size="lg">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
