"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/language/language-provider";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  const isBackend = error.message.includes("backend") || error.message.includes("port 5000");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-bold text-foreground">{t("error.somethingWrong")}</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {isBackend
          ? "Start backend first: npm run dev (from office-expense folder)"
          : error.message}
      </p>
      <div className="flex gap-2">
        <Button onClick={reset}>{t("error.tryAgain")}</Button>
        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm text-foreground hover:bg-muted"
        >
          {t("login.signIn")}
        </Link>
      </div>
    </div>
  );
}
