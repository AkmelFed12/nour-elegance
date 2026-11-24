"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { marque } from "@/configuration/marque";
import { usePanier } from "@/fonctionnalites/panier/ContextePanier";

export function Header() {
  const [estOuvert, setEstOuvert] = useState(false);
  const { totalArticles } = usePanier();

  const liens = [
    { nom: "Accueil", href: "/" },
    { nom: "Boutique", href: "/boutique" },
    { nom: "Catégories", href: "/categories" },
    { nom: "Livraison", href: "/livraison" },
    { nom: "Avis", href: "/#temoignages" },
    { nom: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-ivoire sticky top-0 z-50 border-b border-beige/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-dore shrink-0">
              <Image
                src="/images/marque/logo.jpeg"
                alt={`Logo ${marque.nom}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-wide hidden sm:block">
              {marque.nom}
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex gap-6 xl:gap-8">
            {liens.map((lien) => (
              <Link
                key={lien.nom}
                href={lien.href}
                className="text-sm uppercase tracking-widest hover:text-dore transition-colors"
              >
                {lien.nom}
              </Link>
            ))}
          </nav>

          {/* Actions (Panier & Menu Mobile) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/panier" className="relative hover:text-dore transition-colors">
              <ShoppingBag size={24} strokeWidth={1.5} />
              {totalArticles > 0 && (
                <span className="absolute -top-2 -right-2 bg-dore text-ivoire text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalArticles}
                </span>
              )}
            </Link>
            
            <button
              className="lg:hidden hover:text-dore transition-colors p-1"
              onClick={() => setEstOuvert(!estOuvert)}
              aria-label="Menu"
            >
              {estOuvert ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Mobile (Menu Burger) */}
      {estOuvert && (
        <div className="lg:hidden bg-ivoire border-b border-beige/50 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {liens.map((lien) => (
              <Link
                key={lien.nom}
                href={lien.href}
                onClick={() => setEstOuvert(false)}
                className="block px-4 py-4 text-sm uppercase tracking-widest border-b border-beige/20 last:border-0 hover:text-dore hover:bg-creme/30 transition-colors"
              >
                {lien.nom}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}