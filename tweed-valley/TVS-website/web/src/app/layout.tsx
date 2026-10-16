import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminModeBody from "@/components/AdminModeBody";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: {
    default: `${EVENT.name} — OneWheel enduro at Glentress`,
    template: `%s — ${EVENT.shortName}`,
  },
  description: EVENT.tagline,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e2a1f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <AdminModeBody />
          <div className="admin-banner hidden bg-send/20 py-1.5 text-center text-xs font-semibold text-send">
            Admin mode — you are viewing organiser tools
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
