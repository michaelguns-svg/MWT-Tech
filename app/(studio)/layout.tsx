import type { Metadata } from "next";

// This is a SEPARATE root layout from app/(marketing)/layout.tsx, isolated
// via Next.js route groups. Sanity Studio is a full-screen app that expects
// to own the entire page (its own scroll containers, its own resets) — if it
// shared the marketing site's <html>/<body>, global CSS, Navbar, and Footer,
// the two layout systems fight each other, which is exactly what caused the
// squashed nav/footer and broken scrolling. Keeping Studio on its own root
// layout means none of the marketing site's CSS or components ever load here.
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
