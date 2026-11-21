import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { produits } from "@/donnees/produits";
import { CatalogueBoutique } from "@/fonctionnalites/boutique/CatalogueBoutique";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique | Nour_élégance",
  description: "Découvrez notre collection de vêtements pour femmes musulmanes alliant pudeur et élégance.",
};

export default function PageBoutique() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-brun mb-4">La Boutique</h1>
            <p className="text-brun/70 max-w-2xl mx-auto text-sm md:text-base">
              Parcourez notre collection de vêtements confectionnés avec soin, alliant pudeur et élégance.
            </p>
          </div>

          <CatalogueBoutique produits={produits} />

        </div>
      </main>
      <Footer />
    </>
  );
}