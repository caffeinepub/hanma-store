import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

interface AccessDeniedScreenProps {
  errorMessage?: string | null;
}

export default function AccessDeniedScreen({ errorMessage }: AccessDeniedScreenProps) {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <ShieldAlert className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-3 text-2xl font-bold">Admin Access Required</h1>
        <p className="mb-6 text-muted-foreground">
          {identity
            ? 'You do not have admin privileges. This area is restricted to administrators only.'
            : 'This area is restricted to administrators only. Please log in to access the admin dashboard.'}
        </p>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-6 text-left">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {identity && (
          <div className="mb-6 rounded-lg border bg-muted/50 p-4 text-left text-sm">
            <p className="font-medium mb-2">Note:</p>
            <p className="text-muted-foreground">
              Admin access is granted through explicit role assignment. Contact your system administrator to request admin privileges.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!identity && (
            <Button onClick={login} size="lg">
              Login to Continue
            </Button>
          )}
          <Button onClick={() => navigate({ to: '/' })} variant="outline" size="lg">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
