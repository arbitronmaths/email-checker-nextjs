import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Email Checker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Sonner Toaster (place near the end of body so it overlays UI) */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
