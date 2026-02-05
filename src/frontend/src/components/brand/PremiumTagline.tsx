import { cafe37Content } from '../../content/cafe37';

export default function PremiumTagline() {
  return (
    <p className="text-muted-foreground">
      {cafe37Content.tagline}
    </p>
  );
}
