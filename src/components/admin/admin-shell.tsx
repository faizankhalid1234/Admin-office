"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Shield,
  LayoutDashboard,
  Users,
  Wallet,
  Receipt,
  LogOut,
  ExternalLink,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSelect } from "@/components/language/language-select";
import { AdminThemeToggle } from "@/components/admin/admin-theme-toggle";
import { useTranslation } from "@/components/language/language-provider";
import { APP_PATHS, APP_LINKS } from "@/lib/app-urls";
import { COMPANY_NAME } from "@/lib/constants";
import type { TranslationKey } from "@/lib/i18n/translations";

const navItems: { href: string; labelKey: TranslationKey; icon: typeof LayoutDashboard }[] = [
  { href: APP_PATHS.adminDashboard, labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: APP_PATHS.adminUsers, labelKey: "nav.users", icon: Users },
  { href: APP_PATHS.adminBudget, labelKey: "nav.budget", icon: Wallet },
  { href: APP_PATHS.adminExpenses, labelKey: "nav.expenses", icon: Receipt },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="flex-1 space-y-1 p-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === APP_PATHS.adminDashboard
            ? pathname === APP_PATHS.adminDashboard
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(item.labelKey)}
          </Link>
        );
      })}

      <div className="my-4 border-t border-sidebar-border" />

      <Link
        href={APP_LINKS.websiteDashboard()}
        onClick={onNavigate}
        className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        {t("nav.employeeWebsite")}
      </Link>
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="admin-bg flex min-h-screen min-h-[100dvh]">
      <aside className="admin-sidebar-gradient hidden w-64 shrink-0 flex-col md:flex">
        <div className="border-b border-sidebar-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary/20 ring-1 ring-sidebar-primary/25">
              <Shield className="h-5 w-5 text-sidebar-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/60">
                {t("app.adminSite")}
              </p>
              <p className="text-sm font-bold text-sidebar-foreground">{COMPANY_NAME}</p>
            </div>
          </div>
        </div>
        <SidebarNav />
        <div className="border-t border-sidebar-border p-4">
          <p className="mb-2 truncate text-xs text-sidebar-foreground/50">{session?.user?.email}</p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => signOut({ callbackUrl: APP_PATHS.adminLogin })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("nav.signOut")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border/60 bg-card/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2 md:hidden">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">{t("app.adminPanel")}</span>
          </div>

          <div className="hidden md:block" />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSelect className="h-9 w-[108px] border-border/60 bg-background text-xs sm:w-[120px]" />
            <AdminThemeToggle className="relative h-9 w-9 rounded-lg" />

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="admin-sidebar-gradient w-72 border-sidebar-border p-0"
              >
                <div className="border-b border-sidebar-border p-5">
                  <p className="text-sm font-bold text-sidebar-foreground">
                    {t("app.controlCenter")}
                  </p>
                </div>
                <SidebarNav onNavigate={() => setMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
