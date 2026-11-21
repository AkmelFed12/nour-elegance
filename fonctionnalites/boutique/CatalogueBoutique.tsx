"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Produit } from "@/types/produit";
import { CarteProduit } from "@/composants/CarteProduit";
import { categories } from "@/donnees/categories";

export function CatalogueBoutique({ produits }: { produits: Produit[] }) {
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState("toutes");
  const [tri, setTri] = useState("defaut");

  const produitsFiltres = produits
    .filter((produit) => {
      const correspondRecherche = produit.nom.toLowerCase().includes(recherche.toLowerCase());
      const correspondCategorie = categorieActive === "toutes" || produit.categorie === categorieActive;
      return correspondRecherche && correspondCategorie;
    })
    .sort((a, b) => {
      if (tri === "prix-asc") return a.prix - b.prix;
      if (tri === "prix-desc") return b.prix - a.prix;
      return 0;
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-creme/30 p-4 rounded-sm border border-beige/50">
        
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-brun/40" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une création..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-ivoire border border-beige text-sm text-brun focus:outline-none focus:border-dore transition-colors rounded-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SlidersHorizontal size={16} className="text-brun/40" />
            </div>
            <select
              value={categorieActive}
              onChange={(e) => setCategorieActive(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-ivoire border border-beige text-sm text-brun focus:outline-none focus:border-dore transition-colors rounded-sm appearance-none cursor-pointer"
            >
              <option value="toutes">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.identifiant} value={cat.nom}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-48">
            <select
              value={tri}
              onChange={(e) => setTri(e.target.value)}
              className="w-full px-4 py-2.5 bg-ivoire border border-beige text-sm text-brun focus:outline-none focus:border-dore transition-colors rounded-sm appearance-none cursor-pointer"
            >
              <option value="defaut">Trier par</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

      </div>

      {produitsFiltres.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-brun/60 font-serif text-xl">
            Aucune création ne correspond à votre recherche.
          </p>
          <button 
            onClick={() => { setRecherche(""); setCategorieActive("toutes"); setTri("defaut"); }}
            className="mt-4 text-sm text-dore hover:text-brun underline transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produitsFiltres.map((produit) => (
            <CarteProduit key={produit.identifiant} produit={produit} />
          ))}
        </div>
      )}
    </div>
  );
}