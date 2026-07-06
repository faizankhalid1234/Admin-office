import { AdminExpensesHistory } from "@/components/admin/admin-expenses-history";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { serverApi } from "@/lib/server-api";

export default async function AdminExpensesPage() {
  const [expenses, users, categories] = await Promise.all([
    serverApi<
      Array<{
        id: string;
        title: string;
        amount: number;
        currency: string;
        date: string;
        paymentMethod: string;
        description?: string | null;
        receiptUrl?: string | null;
        receiptName?: string | null;
        category?: { id: string; name: string; color: string };
        user?: { id: string; name: string; email?: string; role?: string };
      }>
    >("/api/admin/expenses"),
    serverApi<
      Array<{
        id: string;
        name: string;
        email: string;
        role: string;
      }>
    >("/api/users"),
    serverApi<Array<{ id: string; name: string }>>("/api/categories"),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badgeKey="expenses.badge"
        titleKey="expenses.title"
        descKey="expenses.desc"
      />
      <AdminExpensesHistory
        expenses={expenses}
        users={users}
        categories={categories}
      />
    </div>
  );
}
