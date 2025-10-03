import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Rocket, Users } from "lucide-react";

export type SummarySnapshot = {
  totalUsers: number;
  upsellCandidates: number;
  averageFeatureAdoption: number;
  premiumReady: number;
};

type SummaryCardsProps = {
  snapshot: SummarySnapshot;
};

const cardThemes = [
  {
    accent: "bg-gradient-to-br from-primary/15 via-primary/10 to-transparent",
    icon: Users,
    caption: "Total seat owners in workspace",
    footerLabel: "Active in last 7 days",
  },
  {
    accent: "bg-gradient-to-br from-sky-400/20 via-primary/10 to-transparent",
    icon: Rocket,
    caption: "Scored 7.5+ by AI model",
    footerLabel: "Ready for upgrade outreach",
  },
  {
    accent: "bg-gradient-to-br from-cyan-400/20 via-primary/5 to-transparent",
    icon: ArrowUpRight,
    caption: "Average advanced feature depth",
    footerLabel: "AI workflow adoption",
  },
];

const SummaryCards = ({ snapshot }: SummaryCardsProps) => {
  const cards = [
    {
      label: "Total Users",
      value: snapshot.totalUsers,
      secondary: `${snapshot.totalUsers - snapshot.premiumReady} active leaders`,
      progress: Math.min(100, snapshot.totalUsers * 9),
      ...cardThemes[0],
    },
    {
      label: "Users to Upsell",
      value: snapshot.upsellCandidates,
      secondary: `${snapshot.premiumReady} high intent this week`,
      progress: Math.min(
        100,
        (snapshot.upsellCandidates / snapshot.totalUsers) * 100,
      ),
      ...cardThemes[1],
    },
    {
      label: "Feature Adoption Rate",
      value: `${snapshot.averageFeatureAdoption}%`,
      secondary: "Across premium feature set",
      progress: snapshot.averageFeatureAdoption,
      ...cardThemes[2],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.label}
            className={cn(
              "relative overflow-hidden border-border/60 bg-card/90 shadow-subtle",
              card.accent,
            )}
          >
            <CardHeader className="space-y-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/30 bg-primary/10 text-xs font-medium text-primary"
                >
                  {card.footerLabel}
                </Badge>
              </div>
              <div>
                <CardTitle className="text-3xl font-semibold tracking-tight">
                  {card.value}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground/90">
                  {card.label}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{card.secondary}</p>
              <Progress
                value={card.progress}
                className="mt-4 h-2 rounded-full bg-muted/60"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;
