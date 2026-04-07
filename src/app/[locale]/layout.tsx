import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { LocaleUpdater } from "@/components/layout/LocaleUpdater";

const locales = ["pt", "en"] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const nav    = (messages as Record<string, Record<string, string>>).nav    ?? {} as Record<string, string>;
  const footer = (messages as Record<string, Record<string, string>>).footer ?? {} as Record<string, string>;
  const theme  = (messages as Record<string, Record<string, string>>).theme  ?? {} as Record<string, string>;
  const lang   = (messages as Record<string, Record<string, string>>).lang   ?? {} as Record<string, string>;

  return (
    <>
      {/* Updates <html lang="..."> on locale change without re-mounting the root layout */}
      <LocaleUpdater locale={locale} />
      {/* Skip to main content — visible on keyboard focus */}
      <a href="#main-content" className="skip-link">
        {nav.skipLink ?? (locale === "en" ? "Skip to main content" : "Ir para o conteúdo principal")}
      </a>
      <Nav
        locale={locale}
        t={{
          home:     nav.home     ?? "Home",
          blog:     nav.blog     ?? "Blog",
          projects: nav.projects ?? "Projects",
          contact:  nav.contact  ?? "[ email ]",
        }}
        langToggle={lang.toggle   ?? "EN"}
        themeToggle={theme.toggle ?? "Toggle theme"}
      />
      <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
        <main id="main-content" style={{ flex: 1 }}>{children}</main>
      </NextIntlClientProvider>
      <Footer
        t={{
          role:      footer.role      ?? "",
          github:    footer.github    ?? "github",
          linkedin:  footer.linkedin  ?? "linkedin",
          instagram: footer.instagram ?? "@paulocurvellodev",
          email:     footer.email     ?? "email",
        }}
      />
    </>
  );
}
