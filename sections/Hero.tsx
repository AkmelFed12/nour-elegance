import Link from "next/link";
import { marque } from "@/configuration/marque";
import { contact } from "@/configuration/contact";
import { IconeWhatsApp } from "@/composants/IconeWhatsApp";

export function Hero() {
  return (
    <section className="relative bg-creme py-24 md:py-32 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="animer-chargement block text-dore uppercase tracking-[0.2em] text-xs font-semibold mb-4">
          {marque.nom}
        </span>
        <h1 className="animer-chargement delai-100 font-serif text-4xl md:text-6xl text-brun leading-tight">
          {marque.slogan}
        </h1>
        <p className="animer-chargement delai-200 text-brun/70 text-base md:text-lg max-w-xl mx-auto font-light">
          Découvrez des vêtements confectionnés avec soin pour allier pudeur, élégance et féminité.
        </p>
        <div className="animer-chargement delai-300 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/boutique"
            className="w-full sm:w-auto bg-brun text-ivoire px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs hover:bg-dore hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Découvrir la boutique
          </Link>
          <a 
            href={contact.whatsapp.lienContact}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-brun text-brun px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs hover:bg-brun/5 hover:-translate-y-1 transition-all duration-300"
          >
            <IconeWhatsApp className="w-4 h-4" />
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}