import { auth } from "@/auth";
import { AdminUsersManager } from "@/components/admin/admin-users-manager";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { APP_LINKS } from "@/lib/app-urls";
import { serverApi } from "@/lib/server-api";

export default async function AdminUsersPage() {
  const session = await auth();

  const users = await serverApi<
    Array<{
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "EMPLOYEE";
      isActive: boolean;
      createdAt: string;
      _count: { expenses: number };
    }>
  >("/api/users");

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badgeKey="users.badge"
        titleKey="users.title"
        descKey="users.desc"
        extra={
          <p className="mt-2 font-mono text-xs text-muted-foreground/70">
            {APP_LINKS.adminLogin()}
          </p>
        }
      />
      <AdminUsersManager
        users={users.map((u) => ({
          ...u,
          createdAt: u.createdAt,
        }))}
        currentUserId={session?.user?.id ?? ""}
      />
    </div>
  );
}
