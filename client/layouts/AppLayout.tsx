import { ReactNode, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  LayoutDashboard,
  LineChart,
  Menu,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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

type SidebarContentProps = {
  onNavigate?: () => void;
};

const SidebarContent = ({ onNavigate }: SidebarContentProps) => {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 pb-6 pt-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-glow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wider text-white/60">Upsell IQ</p>
          <h2 className="text-lg font-semibold text-white">Admin Studio</h2>
        </div>
      </div>
      <Separator className="mx-6 border-white/10" />
      <ScrollArea className="flex-1 px-4">
        <nav className="mt-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    "hover:bg-white/10 hover:text-white",
                    isActive
                      ? "bg-white/10 text-white shadow-glow-sm"
                      : "text-white/70",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5",
                          isActive && "border-white/20 bg-white/10",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.badge ? (
                        <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold tracking-wide text-white">
                          {item.badge}
                        </span>
                      ) : null}
                      <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="mt-auto space-y-3 px-6 pb-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 text-white shadow-subtle">
          <p className="text-sm font-semibold">Playbook Spotlight</p>
          <p className="mt-2 text-xs text-white/70">
            Orchestrate AI-driven upgrade campaigns and watch premium conversions grow.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={onNavigate}
            className="mt-4 w-full justify-center rounded-lg bg-white/20 text-white hover:bg-white/30"
          >
            Launch Upsell Flow
          </Button>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs text-white/60">
          <p>Need help? Email our team at support@upselliq.com</p>
        </div>
      </div>
    </div>
  );
};

const MobileSidebar = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="left" className="w-[320px] border-r-0 bg-sidebar p-0 text-sidebar-foreground">
      <SidebarContent onNavigate={() => onOpenChange(false)} />
    </SheetContent>
  </Sheet>
);

const AppLayout = ({ title, description, children, headerSlot }: AppLayoutProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const activeNavLabel = useMemo(() => {
    const current = navItems.find((item) => item.href === location.pathname);
    return current?.label ?? "Dashboard";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-soft-radial">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col lg:flex-row">
        <aside className="hidden w-72 overflow-hidden rounded-r-[28px] bg-sidebar shadow-glow-md lg:flex">
          <SidebarContent />
        </aside>
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-2xl">
            <div className="flex flex-col gap-4 px-4 py-4 md:px-8">
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
                    <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
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
                    <Button variant="outline" size="sm" className="rounded-lg border-border/80 bg-white/60 shadow-sm hover:bg-white">
                      <Users className="mr-2 h-4 w-4" />
                      Invite team
                    </Button>
                  </div>
                  <Avatar className="hidden h-10 w-10 rounded-xl md:block">
                    <AvatarFallback className="bg-primary/10 text-primary">AB</AvatarFallback>
                  </Avatar>
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
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-border/80 bg-white/80 shadow-sm">
                  <Bell className="h-5 w-5 text-primary" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
              {headerSlot}
            </div>
          </header>
          <main className="flex-1 px-4 pb-10 pt-6 md:px-8 md:pt-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
