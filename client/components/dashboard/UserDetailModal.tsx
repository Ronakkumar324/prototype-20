import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { buildUpgradeMessage, UpsellUserWithScore } from "@/lib/upsellLogic";
import { Mail, Rocket, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface UserDetailModalProps {
  user: UpsellUserWithScore | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const metricConfig = [
  {
    key: "featureDepth",
    label: "Feature depth",
    description: "Advanced workflow adoption",
  },
  {
    key: "aiAssistUsage",
    label: "AI automation",
    description: "AI assist usage share",
  },
  {
    key: "loginFrequency",
    label: "Weekly logins",
    description: "Team engagement cadence",
    ceiling: 24,
  },
  {
    key: "expansionSignals",
    label: "Expansion signals",
    description: "Seats added, integrations, invites",
  },
] as const;

const UserDetailModal = ({ user, open, onOpenChange }: UserDetailModalProps) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Upgrade preview & rollout plan");

  useEffect(() => {
    if (user) {
      setMessage(buildUpgradeMessage(user));
    }
  }, [user]);

  const metricItems = useMemo(() => {
    if (!user) return [];
    return metricConfig.map((metric) => {
      const rawValue = user.metrics[metric.key];
      const ceiling = metric.ceiling ?? 1;
      const percent = Math.round(
        Math.min(1, metric.ceiling ? rawValue / metric.ceiling : rawValue) * 100,
      );
      return {
        label: metric.label,
        description: metric.description,
        value: metric.ceiling ? `${rawValue} / ${metric.ceiling}` : `${percent}%`,
        percent,
      };
    });
  }, [user]);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    toast.success(`Upgrade outreach sent to ${user.name}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden rounded-3xl border-border/60 bg-card/95 p-0 shadow-glow-md">
        <DialogHeader className="space-y-2 border-b border-border/60 bg-muted/40 px-6 pb-4 pt-6">
          <DialogTitle className="text-xl font-semibold">
            Upsell plan for {user?.name ?? ""}
          </DialogTitle>
          <DialogDescription>
            Tailor messaging with AI insights anchored in actual product usage.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-8 px-6 py-6">
            {user ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.title} · {user.company}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <Badge className="rounded-full bg-primary/15 text-primary">
                        {user.plan} → {user.preferredUpgrade}
                      </Badge>
                      <Badge variant="outline" className="rounded-full border border-primary/30 bg-primary/10 text-primary">
                        Upsell score: {user.upsellScore.toFixed(1)} / 10
                      </Badge>
                      <Badge variant="secondary" className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                        Last active {user.lastActive}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 px-6 py-4 text-right shadow-glow-sm">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      AI opportunity
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-primary">
                      {user.upsellScore.toFixed(1)}
                    </p>
                    <p className="text-xs text-primary/80">High intent segment</p>
                  </div>
                </div>
                <div className="grid gap-4 rounded-2xl border border-border/70 bg-white/70 p-5 md:grid-cols-2">
                  {metricItems.map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {metric.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{metric.description}</p>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {metric.value}
                        </span>
                      </div>
                      <Progress value={metric.percent} className="h-1.5 rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-border/70 bg-white/70 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Feature focus
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {user.features.map((feature) => (
                      <span
                        key={feature.name}
                        className="flex items-center gap-2 rounded-full bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        {feature.name}
                        <span className="text-[10px] text-muted-foreground/80">
                          {feature.frequency}x monthly
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{user.narrative}</p>
                </div>
                <form className="space-y-4" onSubmit={handleSend}>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Email subject
                    </label>
                    <Input
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      className="mt-2 h-11 rounded-xl border-border/60 bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      AI-personalized message
                    </label>
                    <Textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={7}
                      className="mt-2 rounded-2xl border-border/60 bg-white/80"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Rocket className="h-3.5 w-3.5 text-primary" />
                      Upgrade outreach is tracked in the campaign timeline.
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="rounded-xl text-muted-foreground"
                        onClick={() => {
                          if (!navigator?.clipboard) {
                            toast.error("Clipboard access is unavailable");
                            return;
                          }
                          navigator.clipboard
                            .writeText(message)
                            .then(() => toast.success("Message copied to clipboard"))
                            .catch(() => toast.error("Unable to copy message"));
                        }}
                      >
                        Copy message
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="rounded-xl bg-primary px-6 text-primary-foreground shadow-glow-sm hover:bg-primary/90"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send upgrade email
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </ScrollArea>
        <Separator className="border-border/60" />
        <div className="flex justify-end gap-2 px-6 py-4">
          <Button variant="ghost" className="rounded-xl" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
