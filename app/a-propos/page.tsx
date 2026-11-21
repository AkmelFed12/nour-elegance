import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { marque } from "@/configuration/marque";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Nour_élégance",
  description: "Découvrez l'univers de Nour_élégance, où pudeur et élégance vont de pair.",
};

export default function PageAPropos() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-brun mb-12 text-center">À propos de Nour_élégance</h1>
          
          <div className="bg-creme/30 p-8 md:p-12 rounded-sm border border-beige/50 space-y-6">
            <p className="font-serif text-2xl text-brun leading-relaxed text-center italic">
              « {marque.presentation} »
            </p>
            <div className="w-16 h-px bg-dore mx-auto"></div>
            <p className="text-brun/70 leading-relaxed text-center">
              Chez Nour_élégance, nous croyons que la pudeur et l'élégance peuvent parfaitement s'unir. 
              Chaque vêtement est confectionné avec soin pour vous offrir le meilleur de la mode, 
              tout en respectant vos valeurs.
            </p>
            <p className="text-brun/70 leading-relaxed text-center">
              {marque.slogan}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}