"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { LANGUAGE_OPTIONS, type Locale } from "@/lib/i18n/translations";
import { useLanguage } from "@/components/language/language-provider";

interface LanguageSelectProps {
  className?: string;
}

export function LanguageSelect({ className }: LanguageSelectProps) {
  const { locale, setLocale } = useLanguage();
  const label =
    LANGUAGE_OPTIONS.find((option) => option.value === locale)?.label ?? "English";

  return (
    <Select value={locale} onValueChange={(v) => v && setLocale(v as Locale)}>
      <SelectTrigger className={className}>
        <span className="truncate text-xs sm:text-sm">{label}</span>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
