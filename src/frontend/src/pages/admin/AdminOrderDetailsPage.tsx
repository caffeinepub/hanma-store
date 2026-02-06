import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetOrderById } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorState from '../../components/states/ErrorState';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrderDetailsPage() {
  const { orderId } = useParams({ from: '/admin/orders/$orderId' });
  const navigate = useNavigate();
  const { data: order, isLoading, error, refetch } = useGetOrderById(Number(orderId));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="mb-6 h-10 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState
          title="Order not found"
          message="We couldn't find the order you're looking for."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" onClick={() => navigate({ to: '/admin/orders' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Order #{order.id}</h1>
        <p className="text-muted-foreground">
          Placed on {new Date(Number(order.timestamp) / 1000000).toLocaleString()}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Product ID: {item.productId}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-medium">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Address</p>
                <p className="font-medium">{order.customerAddress}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
