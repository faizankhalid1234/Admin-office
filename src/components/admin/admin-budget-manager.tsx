"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { apiFetch } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils-format";

interface BudgetData {
  month: number;
  year: number;
  amount: number;
  used: number;
  remaining: number;
  percentage: number;
  currency?: "USD" | "CLP";
}

interface BudgetHistory {
  id: string;
  month: number;
  year: number;
  amount: number;
  currency?: "USD" | "CLP";
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function AdminBudgetManager({
  current,
  history,
}: {
  current: BudgetData;
  history: BudgetHistory[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    month: current.month,
    year: current.year,
    amount: current.amount > 0 ? current.amount.toString() : "",
    currency: (current.currency ?? "USD") as "USD" | "CLP",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await apiFetch("/api/budget", {
        method: "POST",
        body: JSON.stringify({
          month: form.month,
          year: form.year,
          amount: parseFloat(form.amount),
          currency: form.currency,
        }),
      });

      if (!result.ok) throw new Error(result.error);

      toast.success("Company budget saved — employee website will show this amount");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save budget");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        {current.amount > 0 ? (
          <Card className="admin-glow-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <Wallet className="h-4 w-4 text-primary" />
                Current Month — Company Spending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Budget</p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {formatCurrency(current.amount, current.currency ?? "USD")}
                  </p>
                </div>
                <div className="rounded-xl bg-orange-500/10 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Spent</p>
                  <p className="mt-1 text-sm font-bold text-orange-300">
                    {formatCurrency(current.used, "USD")}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Left</p>
                  <p className="mt-1 text-sm font-bold text-emerald-300">
                    {formatCurrency(current.remaining, "USD")}
                  </p>
                </div>
              </div>
              <Progress value={Math.min(current.percentage, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {current.percentage.toFixed(1)}% of company budget used this month
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="admin-glow-card border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Wallet className="mb-3 h-12 w-12 opacity-50" />
              <p>No company budget set for this month</p>
            </CardContent>
          </Card>
        )}

        <Card className="admin-glow-card border-border/60">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Set Company Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              This amount syncs to the employee website automatically for all staff.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Month</Label>
                  <Select
                    value={form.month.toString()}
                    onValueChange={(v) => v && setForm({ ...form, month: parseInt(v) })}
                  >
                    <SelectTrigger className="border-border/60 bg-muted text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m, i) => (
                        <SelectItem key={m} value={(i + 1).toString()}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Year</Label>
                  <Input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                    min={2020}
                    max={2100}
                    className="border-border/60 bg-muted text-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Currency</Label>
                <Select
                  value={form.currency}
                  onValueChange={(v) =>
                    v && setForm({ ...form, currency: v as "USD" | "CLP" })
                  }
                >
                  <SelectTrigger className="border-border/60 bg-muted text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="CLP">CLP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  Budget Amount ({form.currency})
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="500000"
                  required
                  className="border-border/60 bg-muted text-foreground"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Company Budget"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="admin-glow-card border-border/60">
        <CardHeader>
          <CardTitle className="text-base text-foreground">Budget History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Period</TableHead>
                <TableHead className="text-right text-muted-foreground">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    No budget history
                  </TableCell>
                </TableRow>
              ) : (
                history.map((b) => (
                  <TableRow key={b.id} className="border-border/50 hover:bg-muted/50">
                    <TableCell className="text-foreground">
                      {MONTHS[b.month - 1]} {b.year}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {formatCurrency(b.amount, b.currency ?? "USD")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
