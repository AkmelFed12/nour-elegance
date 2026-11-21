import Image from "next/image";
import Link from "next/link";
import { Produit } from "@/types/produit";
import { formaterPrix } from "@/utilitaires/formatage";

export function CarteProduit({ produit }: { produit: Produit }) {
  const imagePrincipale = produit.images[0];
  const estEnStock = produit.disponibilite === "en-stock";

  return (
    <div className="group flex flex-col bg-ivoire rounded-sm overflow-hidden border border-beige/40 hover:border-dore/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
      <Link href={`/boutique/${produit.identifiant}`} className="relative aspect-3/4 overflow-hidden block">
        <Image
          src={imagePrincipale}
          alt={produit.nom}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-ivoire/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 text-[9px] md:text-[10px] uppercase tracking-widest font-medium rounded-sm shadow-sm">
          {estEnStock ? "En stock" : "Sur commande"}
        </div>
      </Link>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-dore mb-2 font-medium">
          {produit.categorie}
        </span>
        <h3 className="font-serif text-base md:text-lg text-brun mb-2 flex-1">
          <Link href={`/boutique/${produit.identifiant}`}>
            {produit.nom}
          </Link>
        </h3>
        <div className="font-sans font-medium text-sm md:text-base text-brun/80 mb-4">
          {formaterPrix(produit.prix)}
        </div>
        <Link 
          href={`/boutique/${produit.identifiant}`}
          className="block w-full text-center border border-brun text-brun py-2.5 text-[10px] md:text-xs uppercase tracking-widest hover:bg-brun hover:text-ivoire transition-colors duration-300"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
}