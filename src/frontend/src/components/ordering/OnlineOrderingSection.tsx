import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, ExternalLink, Phone } from 'lucide-react';
import { cafe37Content } from '../../content/cafe37';

interface OnlineOrderingSectionProps {
  variant?: 'default' | 'compact';
}

export default function OnlineOrderingSection({ variant = 'default' }: OnlineOrderingSectionProps) {
  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Order Online</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Order through Zomato, WhatsApp, or call us directly. Payments and delivery are handled by the selected platform.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <a href={cafe37Content.zomatoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Order on Zomato
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full">
            <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Order on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <a href={cafe37Content.phoneLink}>
              <Phone className="mr-2 h-5 w-5" />
              Call to Order
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl">Order Online</CardTitle>
        <CardDescription className="text-base">
          We accept online orders through Zomato and direct contact via WhatsApp or phone. Choose your preferred method below to place your order.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <a href={cafe37Content.zomatoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Order on Zomato
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full">
            <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Order on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <a href={cafe37Content.phoneLink}>
              <Phone className="mr-2 h-5 w-5" />
              Call to Order
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center pt-2 border-t">
          Payments and delivery are handled by the selected platform.
        </p>
      </CardContent>
    </Card>
  );
}
