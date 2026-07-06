import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";
import { serverApi } from "@/lib/server-api";

export default async function AdminDashboardPage() {
  const overview = await serverApi<{
    userCount: number;
    adminCount: number;
    employeeCount: number;
    expenseCount: number;
  }>("/api/admin/overview");

  return <AdminDashboardContent overview={overview} />;
}
