import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpsellUserWithScore } from "@/lib/upsellLogic";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Flame, Mail } from "lucide-react";

interface UserTableProps {
  users: UpsellUserWithScore[];
  onSelect?: (user: UpsellUserWithScore) => void;
}

const priorityTokens: Record<UpsellUserWithScore["priority"], string> = {
  Hot: "bg-red-500/15 text-red-500",
  Warm: "bg-amber-400/15 text-amber-500",
  Nurture: "bg-slate-500/15 text-slate-500",
};

const planStyles: Record<UpsellUserWithScore["plan"], string> = {
  Free: "bg-slate-200/60 text-slate-700",
  Basic: "bg-sky-200/60 text-sky-700",
  Premium: "bg-blue-200/60 text-blue-800",
};

const UserTable = ({ users, onSelect }: UserTableProps) => {
  return (
    <div className="rounded-3xl border border-border/70 bg-card/85 shadow-subtle">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold">User Upsell Pipeline</h3>
          <p className="text-sm text-muted-foreground">
            Ranked by AI signals combining usage depth, team expansion, and
            automation demand.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary"
          >
            {users.filter((user) => user.priority === "Hot").length} hot leads
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full border border-border/80 bg-muted/30 text-xs font-medium text-muted-foreground"
          >
            Tap a row to open details
          </Badge>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border/70">
            <TableHead className="w-[220px]">User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead className="hidden lg:table-cell">Top features</TableHead>
            <TableHead className="w-[200px]">Upsell score</TableHead>
            <TableHead className="hidden xl:table-cell">Last active</TableHead>
            <TableHead className="hidden md:table-cell">Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer border-border/50 bg-white/40 transition hover:-translate-y-0.5 hover:bg-white/70"
              onClick={() => onSelect?.(user)}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.title} · {user.company}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    planStyles[user.plan],
                  )}
                >
                  {user.plan}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex flex-wrap gap-2">
                  {user.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature.name}
                      className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      <Flame className="h-3 w-3 text-primary" />
                      {feature.name}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                    <span>{user.upsellScore.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(user.metrics.aiAssistUsage * 100)}% AI
                    </span>
                  </div>
                  <Progress
                    value={user.upsellScore * 10}
                    className="h-2 rounded-full"
                  />
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                {user.lastActive}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    priorityTokens[user.priority],
                  )}
                >
                  {user.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect?.(user);
                  }}
                >
                  Compose reply
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className="px-6 text-left">
          Use the AI composer inside each record to deliver targeted premium
          upgrade outreach.
        </TableCaption>
      </Table>
    </div>
  );
};

export default UserTable;
