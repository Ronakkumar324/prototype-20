import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpsellUserWithScore } from "@/lib/upsellLogic";
import { Sparkles, TrendingUp } from "lucide-react";

interface UpsellCalloutProps {
  user?: UpsellUserWithScore;
  onSelect?: (user: UpsellUserWithScore) => void;
}

const UpsellCallout = ({ user, onSelect }: UpsellCalloutProps) => {
  if (!user) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 via-primary/8 to-transparent p-6 shadow-glow-sm md:flex md:items-center md:justify-between md:p-8">
      <div className="md:max-w-xl">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">AI spotlight</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-foreground md:text-2xl">
          {user.name} shows a {user.upsellScore}/10 upsell potential
        </h3>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          {user.narrative}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-white/50 text-primary">
            {user.plan} → {user.preferredUpgrade}
          </Badge>
          <Badge variant="secondary" className="rounded-full bg-primary/15 text-primary">
            Top feature: {user.features[0]?.name}
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/40 px-3 py-1 text-xs font-medium text-primary">
            <TrendingUp className="h-3.5 w-3.5" /> {Math.round(user.metrics.aiAssistUsage * 100)}% AI usage
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 md:mt-0">
        <Button
          size="lg"
          className="rounded-2xl bg-primary text-primary-foreground shadow-glow-sm hover:bg-primary/90"
          onClick={() => onSelect?.(user)}
        >
          Open upgrade playbook
        </Button>
        <button
          type="button"
          onClick={() => onSelect?.(user)}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          View detailed usage
        </button>
      </div>
    </div>
  );
};

export default UpsellCallout;
