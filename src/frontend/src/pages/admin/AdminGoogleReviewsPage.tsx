import { useState, useEffect } from 'react';
import { useGetGoogleReviewConfig, useUpdateGoogleReviewConfig } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminGoogleReviewsPage() {
  const { data: config, isLoading: configLoading } = useGetGoogleReviewConfig();
  const updateConfig = useUpdateGoogleReviewConfig();

  const [apiKey, setApiKey] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [fallbackMessage, setFallbackMessage] = useState('4.5+ rating on Google with hundreds of happy customers.');

  useEffect(() => {
    if (config) {
      setApiKey(config.apiKey || '');
      setPlaceId(config.placeId || '');
      setFallbackMessage(config.fallbackRating || '4.5+ rating on Google with hundreds of happy customers.');
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fallbackMessage.trim()) {
      toast.error('Fallback message is required');
      return;
    }

    try {
      await updateConfig.mutateAsync({
        apiKey: apiKey.trim(),
        placeId: placeId.trim(),
        fallbackRating: fallbackMessage.trim(),
      });
      toast.success('Google reviews configuration updated successfully');
    } catch (error: any) {
      console.error('Failed to update configuration:', error);
      toast.error(error.message || 'Failed to update configuration');
    }
  };

  if (configLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Google Reviews Configuration</h1>
        <p className="text-muted-foreground">
          Configure Google Places API integration to display live ratings and review counts
        </p>
      </div>

      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            To display live Google ratings, you need a Google Places API key and your business Place ID.
            If these are not configured, the fallback message will be displayed instead.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Enter your Google Places API credentials to enable live rating display
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Google Places API Key</Label>
                <Input
                  id="apiKey"
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Get your API key from the{' '}
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Google Cloud Console
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeId">Google Place ID</Label>
                <Input
                  id="placeId"
                  type="text"
                  placeholder="ChIJ..."
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Find your Place ID using the{' '}
                  <a
                    href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Place ID Finder
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallbackMessage">Fallback Message *</Label>
                <Textarea
                  id="fallbackMessage"
                  placeholder="4.5+ rating on Google with hundreds of happy customers."
                  value={fallbackMessage}
                  onChange={(e) => setFallbackMessage(e.target.value)}
                  rows={3}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This message will be displayed when live rating data is unavailable or API credentials are not configured.
                  Keep it generic and in English.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={updateConfig.isPending}>
                  {updateConfig.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </>
                  )}
                </Button>
                {updateConfig.isSuccess && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Saved successfully
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">With API credentials:</strong> The system will fetch your current Google rating
              and review count from Google Places API and display them on your website.
            </p>
            <p>
              <strong className="text-foreground">Without API credentials:</strong> The fallback message will be displayed instead.
              This allows you to show a generic rating message without requiring API integration.
            </p>
            <p>
              <strong className="text-foreground">Updates:</strong> Changes to the configuration take effect immediately without
              requiring code changes or redeployment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
