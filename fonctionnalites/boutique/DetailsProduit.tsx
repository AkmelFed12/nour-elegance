"use client";

import { useState } from "react";
import Image from "next/image";
import { Produit } from "@/types/produit";
import { formaterPrix } from "@/utilitaires/formatage";
import { IconeWhatsApp } from "@/composants/IconeWhatsApp";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { contact } from "@/configuration/contact";
import { usePanier } from "@/fonctionnalites/panier/ContextePanier";
import { CarteProduit } from "@/composants/CarteProduit";

export function DetailsProduit({ produit, tousLesProduits }: { produit: Produit; tousLesProduits: Produit[] }) {
  const [imageActive, setImageActive] = useState(produit.images[0]);
  const [quantite, setQuantite] = useState(1);
  const [ajoute, setAjoute] = useState(false);
  const { ajouterAuPanier } = usePanier();

  const produitsSimilaires = tousLesProduits
    .filter((p) => p.categorie === produit.categorie && p.identifiant !== produit.identifiant)
    .slice(0, 4);

  const lienWhatsAppDirect = `${contact.whatsapp.lienContact}?text=${encodeURIComponent(
    `Bonjour Nour_élégance, je souhaite commander l'article suivant : ${produit.nom} (Quantité: ${quantite}).`
  )}`;

  const gererAjout = () => {
    ajouterAuPanier(produit, quantite);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 2000);
  };

  return (
    <div className="space-y-16 md:space-y-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Galerie d'images */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="relative aspect-3/4 w-full rounded-sm overflow-hidden border border-beige/50">
            <Image src={imageActive} alt={produit.nom} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
          </div>
          
          {produit.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {produit.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImageActive(img)}
                  className={`relative aspect-3/4 rounded-sm overflow-hidden border-2 transition-all ${
                    imageActive === img ? "border-dore" : "border-transparent hover:border-beige"
                  }`}
                >
                  <Image src={img} alt={`${produit.nom} - vue ${index + 1}`} fill sizes="25vw" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations produit */}
        <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-dore mb-2 block font-medium">
              {produit.categorie}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-brun mb-4">{produit.nom}</h1>
            <p className="font-sans text-xl md:text-2xl text-brun/80 mb-6">{formaterPrix(produit.prix)}</p>
            <p className="text-sm md:text-base text-brun/70 leading-relaxed">{produit.description}</p>
          </div>

          <div className="space-y-6">
            {produit.couleurs && produit.couleurs.length > 0 && (
              <div>
                <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3">Couleurs disponibles</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {produit.couleurs.map((c) => (
                    <span key={c} className="px-3 py-1.5 md:px-4 md:py-2 border border-beige text-xs md:text-sm rounded-sm text-brun/80">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3">Quantité</h3>
              <div className="flex items-center border border-beige w-32 rounded-sm">
                <button onClick={() => setQuantite(Math.max(1, quantite - 1))} className="p-2 md:p-3 hover:text-dore transition-colors">
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-medium">{quantite}</span>
                <button onClick={() => setQuantite(quantite + 1)} className="p-2 md:p-3 hover:text-dore transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 md:pt-4 space-y-3 md:space-y-4">
            <button 
              onClick={gererAjout}
              className={`w-full py-3.5 md:py-4 uppercase tracking-widest text-xs md:text-sm transition-colors flex items-center justify-center gap-2 rounded-sm ${
                ajoute ? "bg-green-700 text-ivoire" : "bg-brun text-ivoire hover:bg-dore"
              }`}
            >
              {ajoute ? <Check size={18} /> : <ShoppingBag size={18} />}
              {ajoute ? "Ajouté au panier" : "Ajouter au panier"}
            </button>
            
            <a
              href={lienWhatsAppDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-brun text-brun py-3.5 md:py-4 uppercase tracking-widest text-xs md:text-sm hover:bg-brun/5 transition-colors rounded-sm"
            >
              <IconeWhatsApp className="w-4 h-4 md:w-5 md:h-5" />
              Commander directement
            </a>
          </div>
        </div>
      </div>

      {produitsSimilaires.length > 0 && (
        <div className="pt-12 md:pt-16 border-t border-beige/50">
          <h2 className="font-serif text-2xl md:text-3xl text-brun mb-6 md:mb-8 text-center">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {produitsSimilaires.map((p) => (
              <CarteProduit key={p.identifiant} produit={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}