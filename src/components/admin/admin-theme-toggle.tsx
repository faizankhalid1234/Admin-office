"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { useTranslation } from "@/components/language/language-provider";

export function AdminThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("settings.toggleTheme")}
    >
      {mounted ? (
        <>
          <Sun className="h-4 w-4 rotate-0 scale-100 text-amber-500 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
        </>
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
