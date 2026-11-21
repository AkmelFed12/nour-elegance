import Link from "next/link";
import { marque } from "@/configuration/marque";
import { contact } from "@/configuration/contact";
import { signature } from "@/configuration/signature";
import { IconeWhatsApp } from "./IconeWhatsApp";

export function Footer() {
  const anneeActuelle = 2026;

  return (
    <footer className="bg-brun text-ivoire pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{marque.nom}</h3>
            <p className="text-sm opacity-80 leading-relaxed max-w-sm">
              {marque.presentation}
            </p>
            <p className="text-sm font-medium text-dore italic">
              {marque.slogan}
            </p>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-sm mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/" className="hover:text-dore transition-colors">Accueil</Link></li>
              <li><Link href="/boutique" className="hover:text-dore transition-colors">Boutique</Link></li>
              <li><Link href="/categories" className="hover:text-dore transition-colors">Catégories</Link></li>
              <li><Link href="/contact" className="hover:text-dore transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-sm mb-4">Contact & Réseaux</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <a href={contact.whatsapp.lienContact} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-dore transition-colors">
                  <IconeWhatsApp className="w-5 h-5" />
                  Écrivez-nous sur WhatsApp
                </a>
              </li>
              <li>
                <a href={contact.reseauxSociaux.tiktokBoutique} target="_blank" rel="noopener noreferrer" className="hover:text-dore transition-colors">
                  TikTok Boutique
                </a>
              </li>
              <li>
                <a href={contact.reseauxSociaux.tiktokPersonnel} target="_blank" rel="noopener noreferrer" className="hover:text-dore transition-colors">
                  TikTok Personnel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ivoire/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
          <p>© {anneeActuelle} {marque.nom}. Tous droits réservés.</p>
          <p>
            {signature.texte}{" "}
            <a 
              href={signature.lien} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:text-dore transition-colors"
            >
              {signature.nom}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}