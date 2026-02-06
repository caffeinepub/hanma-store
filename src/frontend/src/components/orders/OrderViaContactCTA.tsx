import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Phone } from 'lucide-react';
import { cafe37Content } from '../../content/cafe37';

interface OrderViaContactCTAProps {
  disabled?: boolean;
  productName?: string;
}

export default function OrderViaContactCTA({ disabled = false, productName }: OrderViaContactCTAProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="w-full" size="lg">
          Order via WhatsApp / Call to Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order {productName || 'this item'}</DialogTitle>
          <DialogDescription>
            Choose your preferred contact method to place your order
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button asChild size="lg" className="w-full">
            <a href={cafe37Content.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Order via WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <a href={cafe37Content.phoneLink}>
              <Phone className="mr-2 h-5 w-5" />
              Call to Order
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Our team will assist you with your order
        </p>
      </DialogContent>
    </Dialog>
  );
}
