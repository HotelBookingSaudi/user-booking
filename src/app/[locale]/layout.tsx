import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 🟢 Load file dịch theo locale
  const messages = (await import(`../../../messages/${params.locale}.json`)).default;
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  // const dir = "ltr";

  return (
    <html lang={params.locale} className={poppins.className} dir={dir}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ClientCommons />
          <SiteHeader />
          {children}
          <FooterNav />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
