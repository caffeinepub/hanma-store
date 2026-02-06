import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { homepageSlides } from '@/content/homepageSlides';

export default function HomePromoCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  // Custom autoplay implementation
  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      autoplayRef.current = setInterval(() => {
        if (!isHovered) {
          api.scrollNext();
        }
      }, 4000);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [api, isHovered]);

  const handleImageError = (slideId: number) => {
    setImageErrors((prev) => ({ ...prev, [slideId]: true }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'center',
        }}
        className="w-full"
      >
        <CarouselContent>
          {homepageSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[500px] overflow-hidden rounded-2xl shadow-soft">
                {imageErrors[slide.id] ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center px-8">
                      <h3 className="text-3xl font-bold text-foreground mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                      onError={() => handleImageError(slide.id)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">
                        {slide.title}
                      </h3>
                      <p className="text-lg drop-shadow-md">
                        {slide.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-4">
        {homepageSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              current === index
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
