"use client";

import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { usePanier } from "@/fonctionnalites/panier/ContextePanier";
import { formaterPrix } from "@/utilitaires/formatage";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function PagePanier() {
  const { lignes, supprimerDuPanier, modifierQuantite, sousTotal } = usePanier();

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-12 md:py-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-5xl text-brun mb-8 md:mb-12 text-center">Votre Panier</h1>

          {lignes.length === 0 ? (
            <div className="text-center py-16 md:py-24 bg-creme/20 rounded-sm">
              <p className="text-brun/60 text-base md:text-lg mb-8">Votre panier est actuellement vide.</p>
              <Link 
                href="/boutique"
                className="inline-block bg-brun text-ivoire px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs md:text-sm hover:bg-dore transition-colors"
              >
                Découvrir la boutique
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-creme/20 border border-beige/50 rounded-sm p-4 md:p-6 space-y-6">
                {lignes.map((ligne) => (
                  <div key={ligne.identifiantProduit} className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pb-6 border-b border-beige/50 last:border-0 last:pb-0">
                    
                    <div className="relative w-full sm:w-24 h-48 sm:h-32 rounded-sm overflow-hidden shrink-0">
                      <Image src={ligne.image} alt={ligne.nom} fill sizes="(max-width: 640px) 100vw, 96px" className="object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="font-serif text-lg md:text-xl text-brun">{ligne.nom}</h3>
                      {ligne.couleur && <p className="text-xs md:text-sm text-brun/60 mt-1">Couleur : {ligne.couleur}</p>}
                      <p className="font-medium mt-2">{formaterPrix(ligne.prix)}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <div className="flex items-center border border-beige rounded-sm">
                        <button onClick={() => modifierQuantite(ligne.identifiantProduit, ligne.quantite - 1)} className="px-3 py-2 hover:text-dore">-</button>
                        <span className="px-2 md:px-3 text-sm">{ligne.quantite}</span>
                        <button onClick={() => modifierQuantite(ligne.identifiantProduit, ligne.quantite + 1)} className="px-3 py-2 hover:text-dore">+</button>
                      </div>
                      <button onClick={() => supprimerDuPanier(ligne.identifiantProduit)} className="text-red-800/60 hover:text-red-800 p-2">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-brun text-ivoire p-6 md:p-8 rounded-sm space-y-6">
                <div className="flex justify-between items-center text-base md:text-lg">
                  <span>Sous-total</span>
                  <span className="font-serif text-xl md:text-2xl">{formaterPrix(sousTotal)}</span>
                </div>
                <p className="text-[10px] md:text-xs opacity-70">
                  Les frais de livraison seront confirmés avec vous sur WhatsApp.
                </p>
                <Link 
                  href="/commande"
                  className="w-full flex items-center justify-center gap-2 bg-dore text-brun font-semibold py-3.5 md:py-4 uppercase tracking-widest text-xs md:text-sm hover:bg-white transition-colors rounded-sm"
                >
                  Passer la commande
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}