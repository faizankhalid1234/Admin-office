import { AdminBudgetManager } from "@/components/admin/admin-budget-manager";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { serverApi } from "@/lib/server-api";

export default async function AdminBudgetPage() {
  const [budgetData, history] = await Promise.all([
    serverApi<{
      budget: { amount: number; currency: string } | null;
      used: number;
      remaining: number;
      percentage: number;
      month: number;
      year: number;
    }>("/api/budget"),
    serverApi<
      Array<{ id: string; month: number; year: number; amount: number; currency: string }>
    >("/api/budget/history"),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader badgeKey="budget.badge" titleKey="budget.title" descKey="budget.desc" />

      <AdminBudgetManager
        current={{
          month: budgetData.month,
          year: budgetData.year,
          amount: budgetData.budget?.amount ?? 0,
          used: budgetData.used,
          remaining: budgetData.remaining,
          percentage: budgetData.percentage,
          currency: (budgetData.budget?.currency as "USD" | "JPY" | "CLP" | undefined) ?? "USD",
        }}
        history={history.map((b) => ({
          ...b,
          currency: b.currency as "USD" | "JPY" | "CLP",
        }))}
      />
    </div>
  );
}
