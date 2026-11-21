"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LignePanier } from "@/types/panier";
import { Produit } from "@/types/produit";

interface ContextePanierType {
  lignes: LignePanier[];
  ajouterAuPanier: (produit: Produit, quantite: number) => void;
  supprimerDuPanier: (identifiantProduit: string) => void;
  modifierQuantite: (identifiantProduit: string, quantite: number) => void;
  viderPanier: () => void;
  totalArticles: number;
  sousTotal: number;
}

const ContextePanier = createContext<ContextePanierType | undefined>(undefined);

export function FournisseurPanier({ children }: { children: React.ReactNode }) {
  const [lignes, setLignes] = useState<LignePanier[]>([]);
  const [estCharge, setEstCharge] = useState(false);

  useEffect(() => {
    const panierSauvegarde = localStorage.getItem("nour-elegance-panier");
    if (panierSauvegarde) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLignes(JSON.parse(panierSauvegarde));
      } catch {
        console.error("Erreur de lecture du panier");
      }
    }
    setEstCharge(true);
  }, []);

  useEffect(() => {
    if (estCharge) {
      localStorage.setItem("nour-elegance-panier", JSON.stringify(lignes));
    }
  }, [lignes, estCharge]);

  const ajouterAuPanier = (produit: Produit, quantite: number) => {
    setLignes((prev) => {
      const existe = prev.find((l) => l.identifiantProduit === produit.identifiant);
      if (existe) {
        return prev.map((l) =>
          l.identifiantProduit === produit.identifiant
            ? { ...l, quantite: l.quantite + quantite }
            : l
        );
      }
      return [
        ...prev,
        {
          identifiantProduit: produit.identifiant,
          nom: produit.nom,
          prix: produit.prix,
          image: produit.images[0],
          taille: produit.tailles ? produit.tailles[0] : null,
          couleur: produit.couleurs ? produit.couleurs[0] : null,
          quantite,
        },
      ];
    });
  };

  const supprimerDuPanier = (identifiantProduit: string) => {
    setLignes((prev) => prev.filter((l) => l.identifiantProduit !== identifiantProduit));
  };

  const modifierQuantite = (identifiantProduit: string, quantite: number) => {
    if (quantite < 1) return;
    setLignes((prev) =>
      prev.map((l) =>
        l.identifiantProduit === identifiantProduit ? { ...l, quantite } : l
      )
    );
  };

  const viderPanier = () => setLignes([]);

  const totalArticles = lignes.reduce((acc, l) => acc + l.quantite, 0);
  const sousTotal = lignes.reduce((acc, l) => acc + l.prix * l.quantite, 0);

  return (
    <ContextePanier.Provider
      value={{ lignes, ajouterAuPanier, supprimerDuPanier, modifierQuantite, viderPanier, totalArticles, sousTotal }}
    >
      {children}
    </ContextePanier.Provider>
  );
}

export function usePanier() {
  const contexte = useContext(ContextePanier);
  if (!contexte) throw new Error("usePanier doit être utilisé dans FournisseurPanier");
  return contexte;
}