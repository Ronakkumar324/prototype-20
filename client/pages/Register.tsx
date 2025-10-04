import { Link } from "react-router-dom";

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
import { Separator } from "@/components/ui/separator";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-radial px-4 py-16">
      <Card className="w-full max-w-md border border-border/60 bg-card/95 shadow-glow-sm">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-2xl font-semibold">Create your workspace</CardTitle>
          <CardDescription>
            Invite your team, track adoption, and launch upsell playbooks with ease.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">Full name</Label>
              <Input
                id="register-name"
                placeholder="Avery Brooks"
                className="h-11 rounded-xl border-border/60"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Work email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="you@company.com"
                className="h-11 rounded-xl border-border/60"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                className="h-11 rounded-xl border-border/60"
                required
              />
            </div>
            <Button className="h-11 w-full rounded-xl bg-primary text-primary-foreground">
              Create account
            </Button>
          </form>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
