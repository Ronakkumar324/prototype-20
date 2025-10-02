import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/AppLayout";
import { ShieldCheck } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout
      title="Workspace Settings"
      description="Manage brand details, notification rules, and AI experiment guardrails."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-xl">Brand identity</CardTitle>
            <CardDescription>
              Update workspace labels that appear inside user communications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Workspace name
              </label>
              <Input className="mt-2 h-11 rounded-xl border-border/60 bg-white/80" defaultValue="Upsell IQ" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Support email
              </label>
              <Input className="mt-2 h-11 rounded-xl border-border/60 bg-white/80" defaultValue="success@upselliq.com" />
            </div>
            <Button className="rounded-xl bg-primary text-primary-foreground shadow-glow-sm hover:bg-primary/90">
              Save settings
            </Button>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <CardTitle className="text-lg">Security & compliance</CardTitle>
            </div>
            <CardDescription>
              Configure role-based access, audit logs, and AI guardrails once your policies are ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Provide your requirements and Fusion can build this out when you are ready.
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
