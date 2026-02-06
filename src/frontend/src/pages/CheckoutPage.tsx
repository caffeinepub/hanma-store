import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import OnlineOrderingSection from '../components/ordering/OnlineOrderingSection';

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mb-3 font-display text-3xl font-bold">Ready to Order?</h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          Place your order through Zomato, WhatsApp, or call us directly.
        </p>
        
        <div className="mb-8 w-full max-w-md">
          <OnlineOrderingSection />
        </div>

        <Button size="lg" variant="secondary" onClick={() => navigate({ to: '/menu' })}>
          Browse Menu
        </Button>
      </div>
    </div>
  );
}
