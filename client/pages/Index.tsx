import { useMemo, useState } from "react";

import FeatureAdoptionChart from "@/components/dashboard/FeatureAdoptionChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import UpsellCallout from "@/components/dashboard/UpsellCallout";
import UserDetailModal from "@/components/dashboard/UserDetailModal";
import UserTable from "@/components/dashboard/UserTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { upsellUsers } from "@/data/users";
import {
  attachUpsellScore,
  getHotUpsellTargets,
  getSummarySnapshot,
  UpsellUserWithScore,
} from "@/lib/upsellLogic";
import AppLayout from "@/layouts/AppLayout";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const DashboardPage = () => {
  const users = useMemo(() => attachUpsellScore(upsellUsers), []);
  const summary = useMemo(() => getSummarySnapshot(users), [users]);
  const hotTargets = useMemo(() => getHotUpsellTargets(users), [users]);
  const [selectedUser, setSelectedUser] = useState<UpsellUserWithScore | null>(
    null,
  );

  const headerSlot = useMemo(() => {
    const hotNames = hotTargets
      .slice(0, 3)
      .map((user) => user.name.split(" ")[0]);
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/70 px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/10 text-primary"
          >
            Hot leads this week
          </Badge>
          <span className="text-muted-foreground">
            {hotNames.length > 0 ? hotNames.join(", ") : "No hot leads yet"}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => {
            if (hotTargets.length > 0) setSelectedUser(hotTargets[0]);
          }}
        >
          View AI outreach deck
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }, [hotTargets]);

  return (
    <AppLayout
      title="Upsell Opportunity Command Center"
      description="Monitor usage signals, surface the right customers, and launch targeted upgrade plays."
      headerSlot={headerSlot}
    >
      <div className="space-y-8">
        <UpsellCallout user={hotTargets[0]} onSelect={setSelectedUser} />
        <SummaryCards snapshot={summary} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <FeatureAdoptionChart users={users} />
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <CalendarDays className="h-5 w-5" />
                This week's upsell rituals
              </CardTitle>
              <CardDescription>
                Stay focused on high-impact sequences to convert premium
                upgrades.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary">
                Launch a concierge onboarding review for premium-ready accounts.
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/80 p-4">
                <p className="font-medium text-foreground">AI Outreach</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send upgrade previews to {hotTargets.length} high-intent users
                  using the personalized script.
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/80 p-4">
                <p className="font-medium text-foreground">Feature Focus</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Promote AI Assist and Usage Insights paths—they lead adoption
                  for premium upsells.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <UserTable users={users} onSelect={setSelectedUser} />
      </div>
      <UserDetailModal
        user={selectedUser}
        open={Boolean(selectedUser)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
          }
        }}
      />
    </AppLayout>
  );
};

export default DashboardPage;
