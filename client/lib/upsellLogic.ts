import { UpsellUser } from "@/types/user";

export type UpsellUserWithScore = UpsellUser & {
  upsellScore: number;
  priority: "Hot" | "Warm" | "Nurture";
  featureAdoptionRate: number;
};

type UpsellPlanKey = UpsellUser["plan"];

const planLiftMap: Record<UpsellPlanKey, number> = {
  Free: 1.32,
  Basic: 1.12,
  Premium: 0.92,
};

const normalize = (value: number, ceiling: number) => {
  if (ceiling <= 0) return 0;
  return Math.min(1, Math.max(0, value / ceiling));
};

const clampScore = (score: number) => Math.max(1, Math.min(10, score));

export const calculateUpsellScore = (user: UpsellUser): number => {
  const { metrics } = user;
  const loginScore = normalize(metrics.loginFrequency, 24);
  const featureDepthScore = metrics.featureDepth;
  const aiScore = metrics.aiAssistUsage;
  const seatScore = normalize(metrics.teamSeats, 12);
  const expansionScore = metrics.expansionSignals;

  const weighted =
    loginScore * 0.2 +
    featureDepthScore * 0.27 +
    aiScore * 0.24 +
    seatScore * 0.14 +
    expansionScore * 0.15;

  const planMultiplier = planLiftMap[user.plan] ?? 1;
  const rawScore = weighted * 10 * planMultiplier;
  return Math.round(clampScore(rawScore) * 10) / 10;
};

const inferPriority = (score: number): "Hot" | "Warm" | "Nurture" => {
  if (score >= 8.5) return "Hot";
  if (score >= 6.5) return "Warm";
  return "Nurture";
};

export const attachUpsellScore = (users: UpsellUser[]): UpsellUserWithScore[] =>
  users.map((user) => {
    const upsellScore = calculateUpsellScore(user);
    return {
      ...user,
      upsellScore,
      priority: inferPriority(upsellScore),
      featureAdoptionRate: Math.round(user.metrics.featureDepth * 100),
    };
  });

export const getSummarySnapshot = (users: UpsellUserWithScore[]) => {
  const totalUsers = users.length;
  const upsellCandidates = users.filter((user) => user.upsellScore >= 7.5);
  const totalFeatureDepth = users.reduce((acc, user) => acc + user.metrics.featureDepth, 0);
  const averageFeatureAdoption =
    totalUsers > 0 ? Math.round((totalFeatureDepth / totalUsers) * 100) : 0;

  const premiumReady = users.filter((user) => user.priority === "Hot").length;

  return {
    totalUsers,
    upsellCandidates: upsellCandidates.length,
    averageFeatureAdoption,
    premiumReady,
  };
};

export const deriveFeatureAdoption = (users: UpsellUserWithScore[]) => {
  const featureMap = new Map<string, number>();

  users.forEach((user) => {
    user.features.forEach((feature) => {
      featureMap.set(feature.name, (featureMap.get(feature.name) ?? 0) + feature.frequency);
    });
  });

  const maxFrequency = Math.max(...featureMap.values(), 1);

  return Array.from(featureMap.entries()).map(([name, frequency]) => ({
    name,
    frequency,
    adoption: Math.round((frequency / maxFrequency) * 100),
  }));
};

export const getHotUpsellTargets = (
  users: UpsellUserWithScore[],
  threshold = 8.5,
) => users.filter((user) => user.upsellScore >= threshold);

export const buildUpgradeMessage = (user: UpsellUserWithScore) => {
  const opener = `Hi ${user.name.split(" ")[0]},`;
  const highlight = `I noticed your team engages with ${user.features[0]?.name ?? "our advanced features"} ${user.features[0]?.frequency ?? "frequently"} times per month.`;
  const offer = `Based on your ${Math.round(user.metrics.aiAssistUsage * 100)}% AI adoption, our ${user.preferredUpgrade} plan unlocks deeper automation and concierge rollout support.`;
  const closer = "Let me know a good time this week to walkthrough an upgrade preview.";

  return `${opener}\n\n${highlight}\n${offer}\n\n${closer}`;
};
