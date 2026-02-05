import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <ShieldAlert className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-3 text-2xl font-bold">Admin Access Required</h1>
        <p className="mb-6 text-muted-foreground">
          {identity
            ? 'You do not have admin privileges. Adding and editing products is restricted to admin accounts only. Please log in with an admin account to access product management.'
            : 'This area is restricted to administrators only. Please log in with an admin account to add or edit products.'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!identity && (
            <Button onClick={login} size="lg">
              Login with Admin Account
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
