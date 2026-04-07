"use client";

import { useEffect } from "react";

interface LocaleUpdaterProps {
  locale: string;
}

// Updates <html lang="..."> imperatively on the client whenever the locale changes.
// This avoids putting <html> in the locale layout (which would cause ThemeProvider
// to re-mount and re-inject its <script> tag on every locale navigation).
export function LocaleUpdater({ locale }: LocaleUpdaterProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
