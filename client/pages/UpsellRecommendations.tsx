import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/AppLayout";
import { BrainCircuit, Send } from "lucide-react";
import { toast } from "sonner";

const UpsellRecommendations = () => {
  const [email, setEmail] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !requirements.trim()) {
      toast.error("Add your email and requirements to continue.");
      return;
    }
    toast.success("Thanks! Your upsell requirements have been shared with Fusion.");
    setEmail("");
    setRequirements("");
  };

  return (
    <AppLayout
      title="AI Upsell Recommendations"
      description="Curate campaigns, multi-touch outreach, and activation nudges tailored to your best upgrade candidates."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-panel">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <BrainCircuit className="h-5 w-5" />
              <CardTitle className="text-xl">Personalized playbooks</CardTitle>
            </div>
            <CardDescription>
              Soon you will be able to orchestrate AI-driven upsell journeys,
              layered with touchpoints across email, in-app, and CSM
              collaboration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Prepare a list of plays, experiments, and content modules you
              would like to automate. Fusion can then build the full
              recommendation engine when you are ready.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="requirements-email">Contact email</Label>
                <Input
                  id="requirements-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-xl border-border/60"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements-notes">Requirement details</Label>
                <Textarea
                  id="requirements-notes"
                  placeholder="Outline the upgrade journey, key segments, success metrics, and timing."
                  value={requirements}
                  onChange={(event) => setRequirements(event.target.value)}
                  rows={4}
                  className="rounded-2xl border-border/60"
                  required
                />
              </div>
              <Button
                size="lg"
                type="submit"
                variant="outline"
                className="rounded-xl border-primary/40 bg-white/80 text-primary hover:bg-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Share requirements with Fusion
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-xl">Need something else?</CardTitle>
            <CardDescription>
              Want this page to power dynamic recommendations from your data
              warehouse or CRM? Provide the specs and we will wire it up.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This placeholder keeps the navigation consistent while you finalize
            the broader upsell strategy requirements.
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UpsellRecommendations;
