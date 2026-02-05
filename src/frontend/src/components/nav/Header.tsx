import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../cart/CartProvider';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { cafe37Content } from '../../content/cafe37';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const routerState = useRouterState();
  
  const isAdminRoute = routerState.location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container mx-auto">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <img src="/assets/generated/cafe37-logo.dim_512x512.png" alt={cafe37Content.name} className="h-12 w-12 rounded-lg" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-primary">{cafe37Content.name}</span>
              <span className="text-xs font-medium text-muted-foreground">Milk Colony</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-semibold transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
              inactiveProps={{ className: 'text-foreground/70' }}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-semibold transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
              inactiveProps={{ className: 'text-foreground/70' }}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
              inactiveProps={{ className: 'text-foreground/70' }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
              inactiveProps={{ className: 'text-foreground/70' }}
            >
              Contact
            </Link>
            {identity && isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
                activeProps={{ className: 'text-primary' }}
                inactiveProps={{ className: 'text-foreground/70' }}
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LoginButton />
            {!isAdminRoute && (
              <button
                onClick={() => navigate({ to: '/cart' })}
                className="relative rounded-lg p-2.5 transition-all hover:bg-accent hover:shadow-soft"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-glow">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2.5 transition-colors hover:bg-accent md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 border-t border-border py-6 md:hidden">
            <Link
              to="/"
              className="text-sm font-semibold transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-semibold transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {identity && isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
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
