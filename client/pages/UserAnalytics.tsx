import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/layouts/AppLayout";
import { Lightbulb, Radar } from "lucide-react";

const UserAnalytics = () => {
  return (
    <AppLayout
      title="User Analytics & Cohorts"
      description="Explore engagement cohorts, AI adoption trends, and behavioral benchmarks."
    >
      <div className="space-y-6">
        <Card className="glass-panel">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Radar className="h-5 w-5" />
              <CardTitle className="text-xl">Analytics workspace coming soon</CardTitle>
            </div>
            <CardDescription>
              We will map retention cohorts, lifecycle health scores, and experiment funnels here. Ask Fusion to build it when you have the requirements ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              In the meantime, continue monitoring upsell opportunities in the dashboard. This space will evolve into a deep analytics hub with custom cohort builders, segmentation, and exports.
            </p>
            <Separator />
            <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-primary">
              <Lightbulb className="h-4 w-4" />
              Tip: document the charts and insights you need so Fusion can translate them into production-ready components quickly.
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UserAnalytics;
