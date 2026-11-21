import { produits } from "@/donnees/produits";
import { CarteProduit } from "@/composants/CarteProduit";
import Link from "next/link";
import { Animer } from "@/composants/Animer";

export function ProduitsEnAvant() {
  const produitsMisEnAvant = produits.filter((p) => p.miseEnAvant);

  return (
    <section className="py-16 md:py-24 px-4 bg-ivoire">
      <div className="max-w-7xl mx-auto">
        <Animer>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 gap-4 text-center md:text-left">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brun mb-2">Nos Créations</h2>
              <p className="text-brun/60 text-sm">Découvrez notre sélection de vêtements uniques.</p>
            </div>
            <Link 
              href="/boutique"
              className="text-xs md:text-sm uppercase tracking-widest text-dore hover:text-brun transition-colors border-b border-dore pb-1"
            >
              Voir toute la collection
            </Link>
          </div>
        </Animer>
        
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {produitsMisEnAvant.map((produit, index) => (
            <Animer key={produit.identifiant} delay={index * 100}>
              <CarteProduit produit={produit} />
            </Animer>
          ))}
        </div>
      </div>
    </section>
  );
}