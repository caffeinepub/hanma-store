import { Link } from '@tanstack/react-router';
import { Heart, Phone, MapPin, Clock, Star } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram } from 'react-icons/si';
import { cafe37Content } from '../../content/cafe37';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Footer() {
  const handleShare = (platform: string) => {
    const url = cafe37Content.shareUrl;
    const text = `Check out ${cafe37Content.name} - ${cafe37Content.tagline}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src="/assets/generated/cafe37-logo.dim_512x512.png" alt={cafe37Content.name} className="h-10 w-10 rounded-lg" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-primary">{cafe37Content.name}</span>
                <span className="text-xs text-muted-foreground">{cafe37Content.tagline}</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{cafe37Content.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={cafe37Content.phoneLink} className="hover:text-primary transition-colors">
                  {cafe37Content.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{cafe37Content.status} · {cafe37Content.todayHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary shrink-0" />
                <span>{cafe37Content.rating} ({cafe37Content.reviewCount} Reviews)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-muted-foreground transition-colors hover:text-primary">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold">Share With Friends</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('whatsapp')}
                className="gap-2"
              >
                <SiInstagram className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('facebook')}
                className="gap-2"
              >
                <SiFacebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('twitter')}
                className="gap-2"
              >
                <SiX className="h-4 w-4" />
                X
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('copy')}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            © 2026. Built with <Heart className="h-4 w-4 fill-primary text-primary" /> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
