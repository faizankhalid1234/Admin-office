"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * next-themes injects a <script> to prevent theme flash. React 19 warns when that
 * script is rendered on the client. SSR still emits a normal script; on the client
 * we mark it as non-executable so React does not warn (theme is already applied).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const scriptProps: ThemeProviderProps["scriptProps"] =
    typeof window === "undefined" ? undefined : { type: "application/json" };

  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
