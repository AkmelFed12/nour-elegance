import Link from "next/link";
import { categories } from "@/donnees/categories";

export function Categories() {
  return (
    <section className="py-16 px-4 bg-creme/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl text-center text-brun mb-12">Nos Catégories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((categorie) => (
            <Link
              key={categorie.identifiant}
              href={`/boutique?categorie=${categorie.identifiant}`}
              className="px-6 py-3 bg-ivoire border border-beige text-brun text-sm hover:border-dore hover:text-dore transition-colors duration-300 uppercase tracking-wider rounded-sm"
            >
              {categorie.nom}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}