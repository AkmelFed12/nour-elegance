import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { contact } from "@/configuration/contact";
import { IconeWhatsApp } from "@/composants/IconeWhatsApp";
import { Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nour_élégance",
  description: "Contactez Nour_élégance pour toute question ou commande.",
};

export default function PageContact() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 md:py-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* En-tête de page */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brun mb-6">Parlons de votre style</h1>
            <p className="text-brun/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Une question sur une création, une demande spéciale ou simplement envie d'échanger ? 
              Nous vous répondons avec plaisir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Colonne de gauche : Contact direct */}
            <div className="space-y-6">
              <a 
                href={contact.whatsapp.lienContact}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 bg-creme/20 border border-beige/50 rounded-sm hover:border-dore/50 hover:bg-creme/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#25D366]/10 p-4 rounded-full text-[#25D366] group-hover:scale-110 transition-transform duration-300">
                      <IconeWhatsApp className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-brun/50 uppercase tracking-widest mb-1">WhatsApp</span>
                      <span className="text-lg text-brun font-medium">{contact.whatsapp.numeroAffiche}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brun/30 group-hover:text-dore group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <p className="text-sm text-brun/60 mt-4 pl-16">
                  La manière la plus rapide de nous joindre. Nous répondons généralement en quelques minutes.
                </p>
              </a>

              <div className="p-8 bg-creme/20 border border-beige/50 rounded-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-dore/10 p-4 rounded-full text-dore">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-brun/50 uppercase tracking-widest mb-1">Disponibilité</span>
                    <span className="text-lg text-brun font-medium">Lun. – Sam. | 9h – 19h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne de droite : Réseaux sociaux */}
            <div className="p-8 md:p-10 bg-brun text-ivoire rounded-sm flex flex-col justify-center">
              <h2 className="font-serif text-2xl md:text-3xl mb-4">Suivez notre univers</h2>
              <p className="text-ivoire/70 text-sm md:text-base mb-8 leading-relaxed">
                Découvrez nos nouveautés, nos coulisses et nos inspirations en avant-première sur TikTok.
              </p>
              
              <div className="space-y-3">
                <a 
                  href={contact.reseauxSociaux.tiktokBoutique}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border border-ivoire/20 hover:border-dore/50 rounded-sm transition-colors duration-300"
                >
                  <span className="text-sm font-medium uppercase tracking-wider">Boutique Officielle</span>
                  <ArrowRight className="w-5 h-5 text-ivoire/30 group-hover:text-dore group-hover:translate-x-1 transition-all duration-300" />
                </a>
                <a 
                  href={contact.reseauxSociaux.tiktokPersonnel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border border-ivoire/20 hover:border-dore/50 rounded-sm transition-colors duration-300"
                >
                  <span className="text-sm font-medium uppercase tracking-wider">Compte Personnel</span>
                  <ArrowRight className="w-5 h-5 text-ivoire/30 group-hover:text-dore group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}