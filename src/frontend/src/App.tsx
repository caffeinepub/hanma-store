import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import Header from './components/nav/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailsPage from './pages/admin/AdminOrderDetailsPage';
import AdminGuard from './components/auth/AdminGuard';
import { CartProvider } from './cart/CartProvider';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import { getSecretParameter } from './utils/urlParams';

function Layout() {
  useEffect(() => {
    // Eagerly read and persist admin secret from URL hash at app startup
    // This ensures the token is captured and cleared from the address bar early
    getSecretParameter('caffeineAdminToken');
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ProfileSetupModal />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailsPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminGuard>
      <AdminDashboardPage />
    </AdminGuard>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: () => (
    <AdminGuard>
      <AdminProductsPage />
    </AdminGuard>
  ),
});

const adminCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/categories',
  component: () => (
    <AdminGuard>
      <AdminCategoriesPage />
    </AdminGuard>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders',
  component: () => (
    <AdminGuard>
      <AdminOrdersPage />
    </AdminGuard>
  ),
});

const adminOrderDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders/$orderId',
  component: () => (
    <AdminGuard>
      <AdminOrderDetailsPage />
    </AdminGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  catalogRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  aboutRoute,
  contactRoute,
  adminDashboardRoute,
  adminProductsRoute,
  adminCategoriesRoute,
  adminOrdersRoute,
  adminOrderDetailsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </ThemeProvider>
  );
}
