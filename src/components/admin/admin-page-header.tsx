"use client";

import { useTranslation } from "@/components/language/language-provider";
import type { TranslationKey } from "@/lib/i18n/translations";

interface AdminPageHeaderProps {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  extra?: React.ReactNode;
}

export function AdminPageHeader({
  badgeKey,
  titleKey,
  descKey,
  extra,
}: AdminPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
        {t(badgeKey)}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
        {t(titleKey)}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{t(descKey)}</p>
      {extra}
    </div>
  );
}
