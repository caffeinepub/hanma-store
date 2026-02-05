import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import PremiumTagline from '@/components/brand/PremiumTagline';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="mb-3">
                <PremiumTagline />
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Premium Quality
                <br />
                <span className="text-muted-foreground">Non-Veg Delights</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Discover the finest selection of fresh, high-quality meats and seafood. From farm to table, we ensure
                excellence in every cut.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate({ to: '/catalog' })}>
                  Browse Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
              <img
                src="/assets/generated/hanma-hero.dim_1600x600.png"
                alt="Premium meats"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">Why Choose Hanma store</h2>
            <p className="text-muted-foreground">Quality and freshness you can trust</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl font-bold">1</span>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
              <p className="text-muted-foreground">
                Hand-selected cuts from trusted suppliers, ensuring the highest standards of quality and taste.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Always Fresh</h3>
              <p className="text-muted-foreground">
                Daily deliveries and proper storage ensure your order arrives fresh and ready to cook.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Service</h3>
              <p className="text-muted-foreground">
                Our knowledgeable team is here to help you choose the perfect cuts for any occasion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
