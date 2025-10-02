export type SubscriptionPlan = "Free" | "Basic" | "Premium";

export type FeatureUsage = {
  name: string;
  frequency: number;
};

export type EngagementSignals = {
  loginFrequency: number; // average logins per week
  featureDepth: number; // 0 - 1 scale representing advanced feature adoption
  aiAssistUsage: number; // 0 - 1 scale representing AI assistant usage
  teamSeats: number; // active seats in team
  expansionSignals: number; // 0 - 1 scale for account growth indicators
};

export type UpsellUser = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  plan: SubscriptionPlan;
  features: FeatureUsage[];
  metrics: EngagementSignals;
  lastActive: string;
  preferredUpgrade: string;
  blockers: string[];
  narrative: string;
};
