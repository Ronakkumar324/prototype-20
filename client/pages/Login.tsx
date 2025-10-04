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

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-radial px-4 py-16">
      <Card className="w-full max-w-md border border-border/60 bg-card/95 shadow-glow-sm">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to manage upsell opportunities and orchestrate upgrade plays.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Work email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@company.com"
                className="h-11 rounded-xl border-border/60"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                className="h-11 rounded-xl border-border/60"
                required
              />
            </div>
            <Button className="h-11 w-full rounded-xl bg-primary text-primary-foreground">
              Sign in
            </Button>
          </form>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">
            Need an account?{" "}
            <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
