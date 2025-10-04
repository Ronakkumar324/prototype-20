import { ReactNode, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LineChart,
  Mail,
  Menu,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type AppLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  headerSlot?: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "User Analytics", href: "/analytics", icon: LineChart },
  {
    label: "Upsell Recommendations",
    href: "/recommendations",
    icon: Sparkles,
    badge: "New",
  },
  { label: "Settings", href: "/settings", icon: Settings },
];

const contactEmails = [
  "ronakbhambu525@gmail.com",
  "renatimitesh@gmail.com",
];

type SidebarContentProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
  onLaunchPlaybook?: () => void;
};

const SidebarContent = ({
  collapsed = false,
  onNavigate,
  onToggleCollapse,
  onLaunchPlaybook,
}: SidebarContentProps) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground",
        collapsed ? "px-3" : "px-0",
      )}
      data-collapsed={collapsed}
    >
      <NavLink
        to="/"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 pb-6 pt-8 text-white transition",
          collapsed ? "justify-center" : "px-6 hover:opacity-90",
        )}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-glow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        {!collapsed ? (
          <div>
            <p className="text-sm uppercase tracking-wider text-white/60">
              Upsell IQ
            </p>
            <h2 className="text-lg font-semibold text-white">Admin Studio</h2>
          </div>
        ) : null}
      </NavLink>
      {onToggleCollapse ? (
        <div className={cn("pb-4", collapsed ? "flex justify-center" : "px-6")}>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => onToggleCollapse()}
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      ) : null}
      <Separator
        className={cn("border-white/10", collapsed ? "mx-0" : "mx-6")}
      />
      <ScrollArea
        className={cn("flex-1", collapsed ? "mt-6" : "px-4")}
        type="auto"
      >
        <nav className={cn("space-y-2", collapsed ? "px-1" : "mt-6")}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center rounded-2xl text-sm font-medium transition",
                    collapsed
                      ? "justify-center px-2 py-2.5"
                      : "justify-between px-3 py-2.5",
                    "hover:bg-white/10 hover:text-white",
                    isActive
                      ? "bg-white/10 text-white shadow-glow-sm"
                      : "text-white/70",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "flex items-center gap-3",
                        collapsed && "justify-center",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition",
                          isActive && "border-white/20 bg-white/10",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {!collapsed ? <span>{item.label}</span> : null}
                    </span>
                    {!collapsed ? (
                      <span className="flex items-center gap-2">
                        {item.badge ? (
                          <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold tracking-wide text-white">
                            {item.badge}
                          </span>
                        ) : null}
                        <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                      </span>
                    ) : null}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div
          className={cn(
            "mt-8 space-y-3 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm",
            collapsed ? "text-center" : "text-left",
          )}
        >
          <div className="flex items-center gap-2 text-white/80">
            <Mail className="h-4 w-4" />
            {!collapsed ? <p className="font-semibold">Contact us</p> : null}
          </div>
          <ul className="space-y-1 text-xs text-white/70">
            {contactEmails.map((email) => (
              <li key={email}>
                <a
                  href={`mailto:${email}`}
                  className="transition hover:text-white"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
      {!collapsed ? (
        <div className="mt-auto space-y-3 px-6 pb-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 text-white shadow-subtle">
            <p className="text-sm font-semibold">Playbook Spotlight</p>
            <p className="mt-2 text-xs text-white/70">
              Orchestrate AI-driven upgrade campaigns and watch premium
              conversions grow.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={onLaunchPlaybook}
              className="mt-4 w-full justify-center rounded-lg bg-white/20 text-white hover:bg-white/30"
            >
              Launch Upsell Flow
            </Button>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs text-white/60">
            <p>Need help? Email our team at support@upselliq.com</p>
          </div>
        </div>
      ) : (
        <div className="mt-auto flex flex-col items-center gap-3 pb-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/10 text-white hover:bg-white/20"
            onClick={onLaunchPlaybook}
          >
            <Sparkles className="h-4 w-4" />
            <span className="sr-only">Launch Upsell Flow</span>
          </Button>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/50">
            Support
          </span>
        </div>
      )}
    </div>
  );
};

const MobileSidebar = ({
  open,
  onOpenChange,
  onLaunchPlaybook,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLaunchPlaybook: () => void;
}) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="left"
      className="w-[320px] border-r-0 bg-sidebar p-0 text-sidebar-foreground"
    >
      <SidebarContent
        collapsed={false}
        onNavigate={() => onOpenChange(false)}
        onLaunchPlaybook={onLaunchPlaybook}
      />
    </SheetContent>
  </Sheet>
);

type ActiveModal = "notifications" | "invite" | "profile" | "playbook" | null;

const AppLayout = ({ title, description, children, headerSlot }: AppLayoutProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [playbookNotes, setPlaybookNotes] = useState("");

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const activeNavLabel = useMemo(() => {
    const current = navItems.find((item) => item.href === location.pathname);
    return current?.label ?? "Dashboard";
  }, [location.pathname]);

  const closeModal = () => setActiveModal(null);

  const handleInviteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inviteEmail.trim()) {
      toast.error("Enter an email before sending an invite.");
      return;
    }
    toast.success(`Invite sent to ${inviteEmail.trim()}`);
    setInviteEmail("");
    closeModal();
  };

  const handlePlaybookSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!playbookNotes.trim()) {
      toast.error("Add notes so we can prepare your playbook.");
      return;
    }
    toast.success("Playbook briefing shared with the success team.");
    setPlaybookNotes("");
    closeModal();
  };

  return (
    <div className="bg-soft-radial text-foreground lg:flex lg:min-h-screen lg:items-stretch">
      <aside
        className={cn(
          "hidden shrink-0 flex-col overflow-hidden rounded-r-[28px] border-r border-white/5 bg-sidebar text-sidebar-foreground shadow-glow-md transition-[width] duration-300 ease-in-out lg:flex lg:sticky lg:top-0 lg:h-screen",
          collapsed ? "w-[96px]" : "w-[288px]",
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onNavigate={() => setCollapsed(false)}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
          onLaunchPlaybook={() => setActiveModal("playbook")}
        />
      </aside>
      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        onLaunchPlaybook={() => setActiveModal("playbook")}
      />
      <div className="flex flex-1 flex-col lg:min-h-screen">
        <header className="z-40 border-b border-border/60 bg-card/80 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-4 md:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeNavLabel}
                  </p>
                  <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {title}
                  </h1>
                  {description ? (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-10 w-10 rounded-xl border border-border/60 bg-muted/40 text-muted-foreground shadow-sm transition hover:text-primary md:inline-flex"
                  onClick={() => setActiveModal("notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <div className="hidden items-center gap-3 md:flex">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users, segments, or actions"
                      className="h-10 rounded-xl border border-border/60 bg-muted/40 pl-9 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-2 focus-visible:ring-primary/60"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-border/80 bg-white/60 shadow-sm hover:bg-white"
                    onClick={() => setActiveModal("invite")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Invite team
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal("profile")}
                  className="hidden rounded-xl border border-transparent transition hover:border-primary/30 md:block"
                >
                  <Avatar className="h-10 w-10 rounded-xl">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      AB
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open profile preferences</span>
                </button>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 md:hidden">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users, segments, or actions"
                  className="h-10 rounded-xl border border-border/60 bg-muted/50 pl-9 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-2 focus-visible:ring-primary/60"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border/80 bg-white/80 shadow-sm"
                onClick={() => setActiveModal("notifications")}
              >
                <Bell className="h-5 w-5 text-primary" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
            {headerSlot}
          </div>
        </header>
        <main className="flex-1 px-4 pb-10 pt-6 md:px-8 md:pt-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
      <Dialog
        open={activeModal === "notifications"}
        onOpenChange={(open) => setActiveModal(open ? "notifications" : null)}
      >
        <DialogContent className="max-w-md rounded-3xl border-border/60 bg-card/95">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              You are all caught up! Configure signals to alert you when usage
              surges and premium workflows unlock upsell moments.
            </p>
            <div className="rounded-xl border border-border/70 bg-muted/40 p-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Suggested alerts
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• AI Assist usage rises above 80%</li>
                <li>• Team seats increase by 3 or more</li>
                <li>• Premium workflow trials initiated</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={activeModal === "invite"}
        onOpenChange={(open) => setActiveModal(open ? "invite" : null)}
      >
        <DialogContent className="max-w-md rounded-3xl border-border/60 bg-card/95">
          <DialogHeader>
            <DialogTitle>Invite your team</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleInviteSubmit}>
            <div className="space-y-2">
              <Label htmlFor="invite-email">Teammate email</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
                placeholder="name@company.com"
                className="h-11 rounded-xl border-border/60"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We will email a secure invite with workspace access and the latest
              upsell playbooks.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-primary text-primary-foreground"
              >
                Send invite
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={activeModal === "profile"}
        onOpenChange={(open) => setActiveModal(open ? "profile" : null)}
      >
        <DialogContent className="max-w-md rounded-3xl border-border/60 bg-card/95">
          <DialogHeader>
            <DialogTitle>Profile & workspace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-2xl">
                <AvatarFallback className="bg-primary/10 text-primary">
                  AB
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-semibold text-foreground">
                  Avery Brooks
                </p>
                <p>Head of Revenue Operations</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Workspace
              </p>
              <p className="mt-1 text-sm text-foreground">
                Upsell IQ · Admin Studio
              </p>
              <p className="text-xs">Plan: Premium (trialling Enterprise)</p>
            </div>
            <div className="flex justify-end">
              <Button
                className="rounded-xl bg-primary text-primary-foreground"
                onClick={() => toast.success("Profile preferences saved")}
              >
                Manage preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={activeModal === "playbook"}
        onOpenChange={(open) => setActiveModal(open ? "playbook" : null)}
      >
        <DialogContent className="max-w-lg rounded-3xl border-border/60 bg-card/95">
          <DialogHeader>
            <DialogTitle>Launch upsell playbook</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handlePlaybookSubmit}>
            <p className="text-sm text-muted-foreground">
              Share the scenario you want to accelerate. We will combine AI-based
              scoring with lifecycle nudges to deliver the upgrade sequence.
            </p>
            <div className="space-y-2">
              <Label htmlFor="playbook-notes">Campaign notes</Label>
              <Textarea
                id="playbook-notes"
                value={playbookNotes}
                onChange={(event) => setPlaybookNotes(event.target.value)}
                rows={5}
                placeholder="e.g. Target revenue leaders using AI Assist daily and offer premium concierge onboarding."
                className="rounded-2xl border-border/60"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-primary text-primary-foreground"
              >
                Launch playbook
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppLayout;
