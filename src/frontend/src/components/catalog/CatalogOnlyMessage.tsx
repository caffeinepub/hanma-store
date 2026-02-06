import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { MessageCircle, ExternalLink, Info, Phone } from 'lucide-react';
import { cafe37Content } from '../../content/cafe37';

export default function CatalogOnlyMessage() {
  return (
    <Alert className="border-primary/50 bg-primary/5">
      <Info className="h-5 w-5 text-primary" />
      <AlertTitle className="text-lg font-bold">Order Through Our Partners</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4 text-muted-foreground">
          Browse our menu and place your order through Zomato, WhatsApp, or call us directly. Payments and delivery are handled by the selected platform.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm" variant="default">
            <a href={cafe37Content.zomatoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Order on Zomato
            </a>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Order on WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={cafe37Content.phoneLink}>
              <Phone className="mr-2 h-4 w-4" />
              Call to Order
            </a>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
