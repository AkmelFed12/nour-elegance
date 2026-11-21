import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { marque } from "@/configuration/marque";
import { BoutonWhatsAppFlottant } from "@/composants/BoutonWhatsAppFlottant";
import { FournisseurPanier } from "@/fonctionnalites/panier/ContextePanier";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: `${marque.nom} - ${marque.slogan}`,
  description: marque.presentation,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${montserrat.variable} min-h-screen flex flex-col`}>
        <FournisseurPanier>
          {children}
          <BoutonWhatsAppFlottant />
        </FournisseurPanier>
      </body>
    </html>
  );
}