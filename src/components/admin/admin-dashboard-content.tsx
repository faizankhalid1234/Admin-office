"use client";

import Link from "next/link";
import { Users, Shield, UserCircle, Receipt, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { APP_PATHS, APP_LINKS } from "@/lib/app-urls";
import { useTranslation } from "@/components/language/language-provider";

interface AdminDashboardContentProps {
  overview: {
    userCount: number;
    adminCount: number;
    employeeCount: number;
    expenseCount: number;
  };
}

export function AdminDashboardContent({ overview }: AdminDashboardContentProps) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const firstName = session?.user?.name?.split(" ")[0] ?? "Admin";

  const stats = [
    { labelKey: "dashboard.totalUsers" as const, value: overview.userCount, icon: Users },
    { labelKey: "dashboard.admins" as const, value: overview.adminCount, icon: Shield },
    { labelKey: "dashboard.employees" as const, value: overview.employeeCount, icon: UserCircle },
    { labelKey: "dashboard.totalExpenses" as const, value: overview.expenseCount, icon: Receipt },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
          {t("dashboard.badge")}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          {t("dashboard.welcome", { name: firstName })}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.labelKey} className="admin-stat-card">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{t(stat.labelKey)}</p>
                <Icon className="h-4 w-4 text-primary/60" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="admin-glow-card p-6">
        <h2 className="text-lg font-semibold text-foreground">{t("dashboard.quickActions")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.quickActionsDesc")}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href={APP_PATHS.adminUsers}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
          >
            <Users className="h-4 w-4" />
            {t("dashboard.manageUsers")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={APP_PATHS.adminExpenses}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Receipt className="h-4 w-4" />
            {t("dashboard.viewExpenses")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={APP_LINKS.websiteLogin()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t("dashboard.openWebsite")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
