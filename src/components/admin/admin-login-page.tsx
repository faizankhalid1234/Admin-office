"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  Shield,
  Lock,
  Sparkles,
  Users,
  KeyRound,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSelect } from "@/components/language/language-select";
import { AdminThemeToggle } from "@/components/admin/admin-theme-toggle";
import { useTranslation } from "@/components/language/language-provider";
import { APP_PATHS } from "@/lib/app-urls";
import { COMPANY_NAME } from "@/lib/constants";

export function AdminLoginPage() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    const message =
      error === "CredentialsSignin"
        ? t("login.invalidCredentials")
        : t("login.signInFailed");
    toast.error(message);
  }, [searchParams, t]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const email = form.email.trim().toLowerCase();

    try {
      const loginRes = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: form.password }),
      });

      const loginData = (await loginRes.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!loginRes.ok) {
        toast.error(loginData.error ?? t("login.invalidCredentials"));
        return;
      }

      toast.success(t("login.welcome"));
      window.location.href = APP_PATHS.adminDashboard;
    } catch {
      toast.error(t("login.loginFailed"));
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { icon: Users, text: t("login.feature1") },
    { icon: KeyRound, text: t("login.feature2") },
    { icon: LayoutDashboard, text: t("login.feature3") },
  ];

  return (
    <div className="admin-bg relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden p-4">
      <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-2">
        <LanguageSelect className="h-9 w-[108px] border-border/60 bg-card/90 text-xs sm:w-[120px]" />
        <AdminThemeToggle className="relative h-9 w-9 rounded-lg bg-card/90" />
      </div>

      <div className="admin-grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="admin-login-orb pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div
        className="admin-login-orb pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="hidden space-y-8 px-4 lg:block">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                  {t("login.securePortal")}
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {t("login.title")}
                </h1>
              </div>
            </div>

            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              {t("login.subtitle", { company: COMPANY_NAME })}
            </p>

            <div className="space-y-3">
              {features.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/70">
              {t("login.copyright", { company: COMPANY_NAME })}
            </p>
          </div>

          <div className="admin-glow-card mx-auto w-full max-w-md p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {t("login.adminOnly")}
                </p>
                <h2 className="text-lg font-bold text-foreground">{t("login.controlCenter")}</h2>
              </div>
            </div>

            <div className="mb-6 hidden lg:block">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {t("login.signIn")}
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                {t("login.enterCredentials")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("login.notEmployeeLogin")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("login.adminEmail")}
                </Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@company.com"
                  className="h-11 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("login.password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="h-11 rounded-xl pl-10"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? t("login.verifying") : t("login.accessPanel")}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3 shrink-0" />
              <span>{t("login.authorizedOnly")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
