"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Linkedin } from "lucide-react";

export function Navbar({ locale }: { locale: string }): React.ReactElement {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/blog", label: t("blog") },
    { href: "/projects", label: t("projects") },
  ];

  const otherLocale = locale === "pt" ? "en" : "pt";

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          &lt;paulo /&gt;
        </Link>
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://linkedin.com/in/paulo-curvello"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted transition-colors hover:text-foreground"
          >
            <Linkedin size={17} />
          </a>
          <Link
            href={pathname}
            locale={otherLocale as "pt" | "en"}
            className="rounded border border-border px-2 py-1 text-xs uppercase text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {otherLocale}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
