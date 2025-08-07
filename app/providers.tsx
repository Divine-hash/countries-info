"use client";

import { ThemeProvider } from "next-themes";
type ThemeProviderProps = React.ComponentProps<typeof ThemeProvider>;

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}