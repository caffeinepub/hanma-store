import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Star, Wifi, UtensilsCrossed, Music, MessageCircle } from 'lucide-react';
import { cafe37Content } from '../content/cafe37';
import { getFormattedSchedule } from '../utils/businessHours';
import GoogleRatingSummary from '../components/reviews/GoogleRatingSummary';

export default function ContactPage() {
  const weeklySchedule = getFormattedSchedule();

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight md:text-6xl">
            Visit <span className="text-primary">{cafe37Content.name}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            We're located in {cafe37Content.address.short} and would love to see you!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Find Us Here</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src={cafe37Content.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${cafe37Content.name} location map`}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button asChild className="w-full" size="lg">
                        <a href={cafe37Content.phoneLink}>
                          <Phone className="mr-2 h-5 w-5" />
                          Call Now
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full" size="lg">
                        <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-5 w-5" />
                          WhatsApp
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full" size="lg">
                        <a href={cafe37Content.directionsUrl} target="_blank" rel="noopener noreferrer">
                          <MapPin className="mr-2 h-5 w-5" />
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-bold">Facilities</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Wifi className="h-5 w-5" />
                        </div>
                        <span>Free Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                          <UtensilsCrossed className="h-5 w-5" />
                        </div>
                        <span>Outdoor Seating</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Music className="h-5 w-5" />
                        </div>
                        <span>Live Music on Weekends</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {cafe37Content.address.full}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Phone / WhatsApp</h3>
                      <a 
                        href={cafe37Content.phoneLink}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {cafe37Content.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-semibold">Hours</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {weeklySchedule.map(({ day, hours }) => (
                          <div key={day} className="flex justify-between">
                            <span className="font-medium">{day}</span>
                            <span>{hours}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-primary">
                        {cafe37Content.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Star className="h-6 w-6 fill-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Rating</h3>
                      <GoogleRatingSummary variant="inline" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-bold">Price Range</h3>
                  <p className="mb-4 text-2xl font-bold text-primary">{cafe37Content.priceRange}</p>
                  <p className="text-sm text-muted-foreground">
                    Affordable pricing without compromising on quality or taste.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
