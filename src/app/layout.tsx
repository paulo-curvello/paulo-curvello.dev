import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Syne, DM_Mono } from "next/font/google";
import { BackgroundGrid } from "@/components/shared/BackgroundGrid";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulocurvello.com"),
  title: {
    default: "Paulo Curvello — Senior Software Engineer",
    template: "%s | Paulo Curvello",
  },
  description:
    "Senior Software Engineer specialized in .NET, C# and React. Building scalable systems and sharing what I learn.",
  authors: [{ name: "Paulo Curvello", url: "https://paulocurvello.com" }],
  creator: "Paulo Curvello",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Paulo Curvello",
    type: "website",
    images: [{ url: "/avatar.jpg", width: 400, height: 400, alt: "Paulo Curvello" }],
  },
};

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

// Root layout: owns <html>/<body>, ThemeProvider, and fonts.
// Rendered once — does NOT re-mount on locale navigation.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="pt" data-scroll-behavior="smooth" className={`${syne.variable} ${dmMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BackgroundGrid />
          <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
