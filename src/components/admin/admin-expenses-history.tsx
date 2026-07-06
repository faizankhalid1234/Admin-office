"use client";

import { useMemo, useState } from "react";
import { Search, FileText, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatCurrency } from "@/lib/utils-format";
import { resolveUploadUrl } from "@/lib/api-config";
import { useTranslation } from "@/components/language/language-provider";

export interface AdminExpenseRow {
  id: string;
  title: string;
  amount: number;
  currency: string;
  date: string | Date;
  paymentMethod: string;
  description?: string | null;
  receiptUrl?: string | null;
  receiptName?: string | null;
  category?: { id: string; name: string; color: string };
  user?: { id: string; name: string; email?: string; role?: string };
}

interface AdminUserOption {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

interface AdminExpensesHistoryProps {
  expenses: AdminExpenseRow[];
  users: AdminUserOption[];
  categories: CategoryOption[];
}

export function AdminExpensesHistory({
  expenses,
  users,
  categories,
}: AdminExpensesHistoryProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.user?.name.toLowerCase().includes(q) ||
        e.user?.email?.toLowerCase().includes(q);
      const matchesUser = userFilter === "all" || e.user?.id === userFilter;
      const matchesCategory =
        categoryFilter === "all" || e.category?.id === categoryFilter;
      return matchesSearch && matchesUser && matchesCategory;
    });
  }, [expenses, search, userFilter, categoryFilter]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="admin-stat-card">
          <p className="text-xs text-muted-foreground">{t("expenses.totalRecords")}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{filtered.length}</p>
        </Card>
        <Card className="admin-stat-card sm:col-span-2">
          <p className="text-xs text-muted-foreground">{t("expenses.filteredNote")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("expenses.adminOnlyNote")}</p>
        </Card>
      </div>

      <Card className="admin-glow-card">
        <CardContent className="p-4">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("expenses.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 border-border/60 bg-card/40"
              />
            </div>
            <Select value={userFilter} onValueChange={(v) => v && setUserFilter(v)}>
              <SelectTrigger className="w-full border-border/60 bg-card/40 lg:w-[220px]">
                <SelectValue placeholder={t("expenses.allUsers")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("expenses.allUsers")}</SelectItem>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(v) => v && setCategoryFilter(v)}>
              <SelectTrigger className="w-full border-border/60 bg-card/40 lg:w-[180px]">
                <SelectValue placeholder={t("expenses.allCategories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("expenses.allCategories")}</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="table-scroll overflow-x-auto rounded-xl border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">{t("expenses.employee")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("expenses.date")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("expenses.titleCol")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("expenses.category")}</TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    {t("expenses.amount")}
                  </TableHead>
                  <TableHead className="text-muted-foreground">{t("expenses.payment")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("expenses.details")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("expenses.receipt")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                      {t("expenses.notFound")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((expense) => {
                    const receiptUrl = resolveUploadUrl(expense.receiptUrl ?? undefined);
                    return (
                      <TableRow key={expense.id} className="border-border/40 hover:bg-muted/30">
                        <TableCell>
                          <div className="min-w-[140px]">
                            <p className="font-medium text-foreground">{expense.user?.name}</p>
                            <p className="text-xs text-muted-foreground">{expense.user?.email}</p>
                            {expense.user?.role && (
                              <Badge variant="outline" className="mt-1 text-[10px]">
                                {expense.user.role}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm">
                          {formatDate(expense.date)}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-foreground">{expense.title}</p>
                          {expense.description && (
                            <p className="mt-0.5 max-w-[200px] truncate text-xs text-muted-foreground">
                              {expense.description}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          {expense.category && (
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              style={{
                                borderColor: expense.category.color,
                                color: expense.category.color,
                              }}
                            >
                              {expense.category.name}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-semibold whitespace-nowrap">
                          {formatCurrency(expense.amount, expense.currency)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {expense.paymentMethod}
                        </TableCell>
                        <TableCell className="max-w-[180px] text-xs text-muted-foreground">
                          {expense.description || "—"}
                        </TableCell>
                        <TableCell>
                          {receiptUrl ? (
                            <a
                              href={receiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                            >
                              {expense.receiptUrl?.match(/\.pdf$/i) ? (
                                <FileText className="h-3.5 w-3.5" />
                              ) : (
                                <ImageIcon className="h-3.5 w-3.5" />
                              )}
                              {t("expenses.view")}
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {filtered.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              {t("expenses.showing", { count: String(filtered.length) })}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
