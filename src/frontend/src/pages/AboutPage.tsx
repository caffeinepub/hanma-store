import { Users, Heart, Coffee, Award } from 'lucide-react';
import { cafe37Content } from '../content/cafe37';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight md:text-6xl">
            About <span className="text-primary">{cafe37Content.name}</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            {cafe37Content.tagline} - A premium café experience in the heart of {cafe37Content.address.short}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6 font-display text-4xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to {cafe37Content.name}, where every visit is a celebration of good food, warm hospitality, 
                  and memorable moments. Located in the vibrant neighborhood of Milk Colony, Belgachia, we've become 
                  a beloved gathering spot for food lovers across Kolkata.
                </p>
                <p>
                  Our café is built on the foundation of three simple principles: quality ingredients, affordable pricing, 
                  and a cozy atmosphere that makes everyone feel at home. From our signature chicken tikka pizza to our 
                  carefully crafted beverages, every item on our menu is prepared with care and passion.
                </p>
                <p>
                  What sets us apart is our commitment to creating not just a café, but a community space. With free Wi-Fi, 
                  outdoor seating, and live music on weekends, we've created an environment where friends meet, families 
                  gather, and memories are made.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <img
                src="/assets/generated/cafe37-hero.dim_1600x900.png"
                alt={`${cafe37Content.name} interior`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">What Makes Us Special</h2>
            <p className="text-lg text-muted-foreground">The {cafe37Content.name} difference</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Coffee className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Cozy Ambience</h3>
              <p className="text-sm text-muted-foreground">
                A warm and inviting atmosphere that makes you feel right at home, perfect for any occasion.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Friendly Staff</h3>
              <p className="text-sm text-muted-foreground">
                Our team is dedicated to providing exceptional service with a smile, making every visit special.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Popular Dishes</h3>
              <p className="text-sm text-muted-foreground">
                From our famous chicken tikka pizza to delicious sandwiches and burgers, every dish is a crowd favorite.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Heart className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Community Hub</h3>
              <p className="text-sm text-muted-foreground">
                More than just a café, we're a gathering place where the community comes together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-display text-4xl font-bold">Visit Us</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              We're open daily and would love to welcome you. Whether you're looking for a quick coffee, 
              a hearty meal, or a place to relax with friends, {cafe37Content.name} is here for you.
            </p>
            <p className="mb-8 text-lg font-semibold text-foreground">
              {cafe37Content.status} · {cafe37Content.todayHours}
            </p>
            <p className="text-lg text-muted-foreground">
              Thank you for being part of our story. We look forward to serving you soon!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
