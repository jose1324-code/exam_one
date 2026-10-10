import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrightPath Academy — Chennai's #1 Coaching for Class 10–12 | NEET & JEE",
  description:
    "BrightPath Academy, Chennai — Class 10–12 tuition and NEET/JEE foundation batches. Small batches, expert faculty. Book a FREE demo class. (Fictional demo website — all data is sample.)",
  keywords: ["coaching Chennai", "NEET foundation", "JEE foundation", "Class 10 tuition", "BrightPath Academy"],
  openGraph: {
    title: "BrightPath Academy — Unlock Your Child's True Potential",
    description: "Expert NEET & JEE foundation batches in Chennai. Small batches. Big results. First demo FREE. (Sample data)",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${grotesk.variable}`}>
      <body className="font-inter bg-bg text-ink antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              boxShadow: "0 12px 40px rgba(26,35,126,0.16)",
            },
          }}
        />
      </body>
    </html>
  );
}
