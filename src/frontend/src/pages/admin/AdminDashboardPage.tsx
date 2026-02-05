import { Link } from '@tanstack/react-router';
import { Package, FolderTree, ShoppingBag, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllProducts, useGetAllCategories, useGetAllOrders } from '../../hooks/useQueries';

export default function AdminDashboardPage() {
  const { data: products = [] } = useGetAllProducts();
  const { data: categories = [] } = useGetAllCategories();
  const { data: orders = [] } = useGetAllOrders();

  const stats = [
    {
      title: 'Products',
      value: products.length,
      description: 'Total products in catalog',
      icon: Package,
      link: '/admin/products',
      color: 'text-blue-600',
    },
    {
      title: 'Categories',
      value: categories.length,
      description: 'Product categories',
      icon: FolderTree,
      link: '/admin/categories',
      color: 'text-green-600',
    },
    {
      title: 'Orders',
      value: orders.length,
      description: 'Total customer orders',
      icon: ShoppingBag,
      link: '/admin/orders',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your store products, categories, and orders</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              to="/admin/products"
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="font-medium">Manage Products</div>
              <div className="text-sm text-muted-foreground">Add, edit, or remove products</div>
            </Link>
            <Link
              to="/admin/categories"
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="font-medium">Manage Categories</div>
              <div className="text-sm text-muted-foreground">Organize your product catalog</div>
            </Link>
            <Link
              to="/admin/orders"
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="font-medium">View Orders</div>
              <div className="text-sm text-muted-foreground">Check customer orders and details</div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Getting Started
            </CardTitle>
            <CardDescription>Set up your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.length === 0 && (
              <div className="p-3 rounded-lg border border-dashed bg-muted/50">
                <div className="font-medium">Add Your First Products</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Start by adding products to your catalog
                </div>
                <Link
                  to="/admin/products"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Go to Products →
                </Link>
              </div>
            )}
            {categories.length === 0 && (
              <div className="p-3 rounded-lg border border-dashed bg-muted/50">
                <div className="font-medium">Create Categories</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Organize products into categories
                </div>
                <Link
                  to="/admin/categories"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Go to Categories →
                </Link>
              </div>
            )}
            {products.length > 0 && categories.length > 0 && (
              <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                <div className="font-medium text-green-900 dark:text-green-100">
                  Store is Ready!
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Your store is set up and ready for customers
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
