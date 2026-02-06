import { Link } from '@tanstack/react-router';
import { Package, FolderTree, ShoppingBag, Star, UtensilsCrossed, LayoutDashboard, Settings, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllProducts, useGetAllCategories, useGetAllOrders, useGetMenu } from '../../hooks/useQueries';

export default function AdminDashboardPage() {
  const { data: products = [], isLoading: productsLoading, error: productsError } = useGetAllProducts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useGetAllCategories();
  const { data: orders = [], isLoading: ordersLoading, error: ordersError } = useGetAllOrders();
  const { data: menu = [], isLoading: menuLoading, error: menuError } = useGetMenu();

  const hasAnyError = productsError || categoriesError || ordersError || menuError;
  const isAnyLoading = productsLoading || categoriesLoading || ordersLoading || menuLoading;

  const stats = [
    {
      title: 'Products',
      value: productsLoading ? '...' : productsError ? '—' : products.length,
      description: 'Total products in catalog',
      icon: Package,
      link: '/admin/products',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      error: productsError,
    },
    {
      title: 'Categories',
      value: categoriesLoading ? '...' : categoriesError ? '—' : categories.length,
      description: 'Product categories',
      icon: FolderTree,
      link: '/admin/categories',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      error: categoriesError,
    },
    {
      title: 'Menu Items',
      value: menuLoading ? '...' : menuError ? '—' : menu.reduce((acc, cat) => acc + cat.items.length, 0),
      description: 'Restaurant menu items',
      icon: UtensilsCrossed,
      link: '/admin/menu',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      error: menuError,
    },
    {
      title: 'Orders',
      value: ordersLoading ? '...' : ordersError ? '—' : orders.length,
      description: 'Total customer orders',
      icon: ShoppingBag,
      link: '/admin/orders',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      error: ordersError,
    },
  ];

  const managementSections = [
    {
      title: 'Product Management',
      icon: Package,
      color: 'text-red-600 dark:text-red-400',
      items: [
        {
          title: 'Manage Products',
          description: 'Add, edit, or remove products from your catalog',
          link: '/admin/products',
        },
        {
          title: 'Manage Categories',
          description: 'Organize your product catalog with categories',
          link: '/admin/categories',
        },
      ],
    },
    {
      title: 'Menu Management',
      icon: UtensilsCrossed,
      color: 'text-orange-600 dark:text-orange-400',
      items: [
        {
          title: 'Edit Menu',
          description: 'Manage restaurant menu items and availability',
          link: '/admin/menu',
        },
      ],
    },
    {
      title: 'Order Management',
      icon: ShoppingBag,
      color: 'text-green-600 dark:text-green-400',
      items: [
        {
          title: 'View Orders',
          description: 'Check customer orders and order details',
          link: '/admin/orders',
        },
      ],
    },
    {
      title: 'Settings & Configuration',
      icon: Settings,
      color: 'text-blue-600 dark:text-blue-400',
      items: [
        {
          title: 'Google Reviews',
          description: 'Configure rating and review display settings',
          link: '/admin/google-reviews',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Manage your restaurant products, menu, orders, and settings</p>
      </div>

      {/* Error Alert */}
      {hasAnyError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load some dashboard data. Please refresh the page or check your connection.
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isLoading = stat.value === '...';
          const hasError = !!stat.error;

          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <div className={`text-3xl font-bold ${hasError ? 'text-muted-foreground' : ''}`}>
                      {stat.value}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Public View Section */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            Public View
          </CardTitle>
          <CardDescription>View your restaurant as customers see it</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
            <Link to="/menu" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View Public Menu
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            See how your menu appears to customers on the public website
          </p>
        </CardContent>
      </Card>

      {/* Management Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {managementSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${section.color}`} />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.items.map((item) => (
                  <Link
                    key={item.link}
                    to={item.link}
                    className="block p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all"
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Getting Started Section */}
      {!isAnyLoading && !hasAnyError && (products.length === 0 || categories.length === 0 || menu.length === 0) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Getting Started
            </CardTitle>
            <CardDescription>Complete these steps to set up your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.length === 0 && !productsLoading && (
              <div className="p-4 rounded-lg border border-dashed bg-muted/50">
                <div className="font-medium">Add Your First Products</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Start by adding products to your catalog
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/products">Go to Products →</Link>
                </Button>
              </div>
            )}
            {categories.length === 0 && !categoriesLoading && (
              <div className="p-4 rounded-lg border border-dashed bg-muted/50">
                <div className="font-medium">Create Categories</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Organize products into categories
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/categories">Go to Categories →</Link>
                </Button>
              </div>
            )}
            {menu.length === 0 && !menuLoading && (
              <div className="p-4 rounded-lg border border-dashed bg-muted/50">
                <div className="font-medium">Set Up Menu</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Add menu items for your restaurant
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/menu">Go to Menu →</Link>
                </Button>
              </div>
            )}
            {products.length > 0 && categories.length > 0 && menu.length > 0 && (
              <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <div className="font-medium text-green-900 dark:text-green-100">
                  ✓ Store is Ready!
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Your store is set up and ready for customers
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
