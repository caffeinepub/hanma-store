import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../cart/CartProvider';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import PremiumTagline from '../brand/PremiumTagline';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const routerState = useRouterState();
  
  const isAdminRoute = routerState.location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/generated/hanma-logo.dim_512x512.png" alt="Hanma store" className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">Hanma store</span>
              {!isAdminRoute && (
                <div className="hidden sm:block">
                  <PremiumTagline />
                </div>
              )}
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
              activeProps={{ className: 'text-foreground' }}
              inactiveProps={{ className: 'text-foreground/60' }}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
              activeProps={{ className: 'text-foreground' }}
              inactiveProps={{ className: 'text-foreground/60' }}
            >
              Menu
            </Link>
            {identity && isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80"
                activeProps={{ className: 'text-foreground' }}
                inactiveProps={{ className: 'text-foreground/60' }}
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <LoginButton />
            <button
              onClick={() => navigate({ to: '/cart' })}
              className="relative rounded-lg p-2 transition-colors hover:bg-accent"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-accent md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 border-t border-border py-4 md:hidden">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            {identity && isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
