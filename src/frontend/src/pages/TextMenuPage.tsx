import { useGetProductCatalog } from '../hooks/useQueries';
import { cafe37Content } from '../content/cafe37';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import ErrorState from '../components/states/ErrorState';
import type { SwitchProduct, SwitchCategory } from '../backend';

export default function TextMenuPage() {
  const { data: catalog, isLoading, error, refetch } = useGetProductCatalog();
  const [activeSection, setActiveSection] = useState<string>('');

  const categories = catalog?.categories ?? [];
  const products = catalog?.products ?? [];

  // Group products by category and create sections
  const categorySections = useMemo(() => {
    const sections: Array<{ category: SwitchCategory; products: SwitchProduct[] }> = [];
    
    // Add sections for each category with products
    categories.forEach((category) => {
      const categoryProducts = products.filter((p) => p.categoryId === category.id);
      if (categoryProducts.length > 0) {
        sections.push({ category, products: categoryProducts });
      }
    });

    // Add uncategorized section if there are products without a category
    const uncategorizedProducts = products.filter((p) => p.categoryId === null || p.categoryId === undefined);
    if (uncategorizedProducts.length > 0) {
      sections.push({
        category: { id: 0, name: 'Uncategorized' },
        products: uncategorizedProducts,
      });
    }

    return sections;
  }, [categories, products]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = categorySections.map((section) => {
        const element = document.getElementById(slugify(section.category.name));
        if (element) {
          const rect = element.getBoundingClientRect();
          return { id: section.category.name, top: rect.top };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find((section) => section && section.top >= 0 && section.top < 300);
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categorySections]);

  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const scrollToSection = (categoryName: string) => {
    const element = document.getElementById(slugify(categoryName));
    if (element) {
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <ErrorState
          title="Failed to load menu"
          message="We couldn't load the menu. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/30 to-background py-12">
        <div className="container mx-auto text-center">
          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            {cafe37Content.name}
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">Milk Colony, Belgachia, Kolkata</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-5 w-5" />
                Order via WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={cafe37Content.phoneLink}>
                <Phone className="h-5 w-5" />
                Call to Order
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      {categorySections.length > 0 && (
        <nav className="sticky top-20 z-40 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 shadow-sm">
          <div className="container mx-auto">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categorySections.map((section) => (
                <button
                  key={section.category.id}
                  onClick={() => scrollToSection(section.category.name)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === section.category.name
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  }`}
                >
                  {section.category.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Menu Content */}
      <div className="container mx-auto py-12">
        <div className="mx-auto max-w-4xl">
          {categorySections.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-4 text-lg text-muted-foreground">Menu items will be available soon.</p>
              <p className="text-sm text-muted-foreground">
                In the meantime, call us at{' '}
                <a href={cafe37Content.phoneLink} className="font-semibold text-primary hover:underline">
                  {cafe37Content.phoneFormatted}
                </a>{' '}
                to learn about our offerings.
              </p>
            </div>
          ) : (
            categorySections.map((section) => (
              <section
                key={section.category.id}
                id={slugify(section.category.name)}
                className="mb-16 scroll-mt-48"
              >
                <h2 className="mb-6 border-b-2 border-primary pb-3 font-display text-3xl font-bold text-foreground">
                  {section.category.name}
                </h2>
                
                <div className="space-y-6">
                  {section.products.map((product) => (
                    <div
                      key={product.id}
                      className={`rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md ${
                        !product.available ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="mb-1 text-lg font-semibold text-card-foreground">
                            {product.name}
                            {!product.available && (
                              <span className="ml-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                Unavailable
                              </span>
                            )}
                          </h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-lg font-bold text-primary">
                            ₹{product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {/* Disclaimer */}
        {categorySections.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              Prices and availability are subject to change without prior notice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
