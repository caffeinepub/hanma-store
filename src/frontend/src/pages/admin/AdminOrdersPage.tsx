import { useGetAllOrders } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '../../components/states/LoadingSkeleton';
import ErrorState from '../../components/states/ErrorState';
import { useNavigate } from '@tanstack/react-router';
import { Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const { data: orders = [], isLoading, error, refetch } = useGetAllOrders();
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState
          title="Failed to load orders"
          message="We couldn't load the orders. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">View and manage customer orders</p>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : orders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(Number(order.timestamp) / 1000000).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate({ to: '/admin/orders/$orderId', params: { orderId: String(order.id) } })}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
