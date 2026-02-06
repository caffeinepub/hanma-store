import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Phone, MessageCircle, MapPin, Music, Wifi, UtensilsCrossed } from 'lucide-react';
import { cafe37Content } from '../content/cafe37';
import GoogleRatingSummary from '../components/reviews/GoogleRatingSummary';
import CatalogOnlyMessage from '../components/catalog/CatalogOnlyMessage';
import HomePromoCarousel from '../components/home/HomePromoCarousel';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col animate-fade-in">
              <GoogleRatingSummary variant="hero" />
              <h1 className="mt-4 mb-4 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                {cafe37Content.name}
              </h1>
              <p className="mb-8 text-xl text-muted-foreground md:text-2xl max-w-xl">
                {cafe37Content.tagline}
              </p>
              <p className="mb-8 text-lg text-muted-foreground">
                {cafe37Content.priceRange} · {cafe37Content.status} · {cafe37Content.todayHours}
              </p>
              
              <div className="mb-6">
                <CatalogOnlyMessage />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <Button size="lg" asChild className="shadow-glow">
                  <a href={cafe37Content.phoneLink}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={cafe37Content.directionsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-5 w-5" />
                    Directions
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <HomePromoCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">Why Choose {cafe37Content.name}</h2>
            <p className="text-lg text-muted-foreground">Experience the best of café culture</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {cafe37Content.highlights.map((highlight, index) => {
              const icons = [UtensilsCrossed, Music, Wifi];
              const Icon = icons[index];
              const colors = ['primary', 'secondary', 'accent'];
              const color = colors[index];
              
              return (
                <div key={index} className="group rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:shadow-soft">
                  <div className="mb-6 flex justify-center">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-${color}/10 text-${color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground mb-8">Hear from our happy customers</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <GoogleRatingSummary variant="section" showLink />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">Visit Us Today</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Experience cozy atmosphere, delicious food, and friendly service at {cafe37Content.name}
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Free Wi-Fi
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4" />
                Outdoor Seating
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Live Music on Weekends
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => navigate({ to: '/menu' })} className="shadow-glow">
                View Menu
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/contact' })}>
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
