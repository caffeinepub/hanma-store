import { Star, ExternalLink, Loader2 } from 'lucide-react';
import { useFetchGoogleRating } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';

interface GoogleRatingSummaryProps {
  variant?: 'hero' | 'footer' | 'section' | 'inline';
  showLink?: boolean;
}

export default function GoogleRatingSummary({ variant = 'hero', showLink = false }: GoogleRatingSummaryProps) {
  const { data, isLoading, isError } = useFetchGoogleRating();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading reviews...</span>
      </div>
    );
  }

  const hasRating = data?.rating !== null && data?.rating !== undefined;
  const hasReviewCount = data?.reviewCount !== null && data?.reviewCount !== undefined;

  if (variant === 'hero') {
    if (hasRating && hasReviewCount && data.rating !== null) {
      return (
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary w-fit">
          <Star className="h-4 w-4 fill-primary" />
          {data.rating.toFixed(1)} ({Number(data.reviewCount)} Reviews)
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary w-fit">
        <Star className="h-4 w-4 fill-primary" />
        {data?.fallbackMessage || '4.5+ rating on Google with hundreds of happy customers.'}
      </div>
    );
  }

  if (variant === 'footer') {
    if (hasRating && hasReviewCount && data.rating !== null) {
      return (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-primary text-primary shrink-0" />
          <span>{data.rating.toFixed(1)} ({Number(data.reviewCount)} Reviews)</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 fill-primary text-primary shrink-0" />
        <span>{data?.fallbackMessage || '4.5+ rating on Google with hundreds of happy customers.'}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    if (hasRating && hasReviewCount && data.rating !== null) {
      return (
        <span className="text-sm text-muted-foreground">
          {data.rating.toFixed(1)} stars ({Number(data.reviewCount)} reviews)
        </span>
      );
    }

    return (
      <span className="text-sm text-muted-foreground">
        {data?.fallbackMessage || '4.5+ rating on Google with hundreds of happy customers.'}
      </span>
    );
  }

  if (variant === 'section') {
    if (hasRating && hasReviewCount && data.rating !== null) {
      return (
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-8 w-8 fill-primary text-primary" />
            <div className="text-left">
              <div className="text-3xl font-bold">{data.rating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">{Number(data.reviewCount)} Reviews</div>
            </div>
          </div>
          {showLink && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://search.google.com/local/reviews?placeid=${data.rating}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                View reviews on Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Star className="h-8 w-8 fill-primary text-primary" />
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          {data?.fallbackMessage || '4.5+ rating on Google with hundreds of happy customers.'}
        </p>
        {showLink && (
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <a
              href="https://www.google.com/search?q=cafe+37+kolkata"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Find us on Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    );
  }

  return null;
}
