export const instant = false;
import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { produits } from "@/donnees/produits";
import { DetailsProduit } from "@/fonctionnalites/boutique/DetailsProduit";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ identifiant: string }> }): Promise<Metadata> {
  const { identifiant } = await params;
  const produit = produits.find((p) => p.identifiant === identifiant);
  
  if (!produit) return { title: "Produit introuvable | Nour_élégance" };
  
  return {
    title: `${produit.nom} | Nour_élégance`,
    description: produit.description,
  };
}

export default async function PageProduit({ params }: { params: Promise<{ identifiant: string }> }) {
  const { identifiant } = await params;
  const produit = produits.find((p) => p.identifiant === identifiant);

  if (!produit) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DetailsProduit produit={produit} tousLesProduits={produits} />
        </div>
      </main>
      <Footer />
    </>
  );
}