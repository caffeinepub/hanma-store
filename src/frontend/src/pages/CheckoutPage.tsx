import { useState, useEffect } from 'react';
import { useCart } from '../cart/CartProvider';
import { useCreateOrder } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate({ to: '/catalog' });
    }
  }, [items.length, orderComplete, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.address.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const newOrderId = await createOrder.mutateAsync({
        items: orderItems,
        totalAmount,
        customerName: formData.name,
        customerEmail: formData.email,
        customerAddress: formData.address,
      });

      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold">Order Confirmed!</h1>
          <p className="mb-3 text-xl text-muted-foreground">Thank you for your order.</p>
          <p className="mb-10 text-lg text-muted-foreground">
            Your order #{orderId} has been received and is being processed.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button onClick={() => navigate({ to: '/catalog' })} size="lg" className="shadow-glow">
              Continue Shopping
            </Button>
            <Button onClick={() => navigate({ to: '/' })} variant="outline" size="lg">
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-10 font-display text-4xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your full delivery address"
                    rows={3}
                    required
                  />
                </div>

                <Button type="submit" className="w-full shadow-glow" size="lg" disabled={createOrder.isPending}>
                  {createOrder.isPending ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
