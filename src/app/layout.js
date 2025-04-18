import localFont from "next/font/local";
import "./globals.css";
import "@/public/css/pattern.css"
import { Toaster } from "sonner";
import QueryClientContainer from "@/components/QueryClientContainer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NexTChat",
  description: "Nextjs chat application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientContainer>
          {children}
          <Toaster className="hidden md:block" richColors closeButton expand={false} duration={3000} position="bottom-right" />
          <Toaster className="md:hidden" richColors closeButton expand={false} duration={3000} position="bottom-right" />
        </QueryClientContainer>
      </body>
    </html>
  );
}
