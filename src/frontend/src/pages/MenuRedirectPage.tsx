import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

export default function MenuRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: '/menu', replace: true });
  }, [navigate]);

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Redirecting to menu...</p>
      </div>
    </div>
  );
}
