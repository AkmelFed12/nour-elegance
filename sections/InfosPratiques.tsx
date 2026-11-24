import Link from "next/link";
import { Truck, Ruler, Star, ArrowRight } from "lucide-react";
import { Animer } from "@/composants/Animer";

export function InfosPratiques() {
  return (
    <section className="py-12 md:py-20 px-4 bg-ivoire">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          
          <Animer delay={100}>
            <Link href="/livraison" className="group flex flex-col h-full p-6 md:p-8 bg-creme/20 border border-beige/50 rounded-sm hover:border-dore/50 hover:bg-creme/40 transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-ivoire rounded-full flex items-center justify-center text-dore mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-brun mb-2">Livraison & Paiement</h3>
              <p className="text-sm text-brun/60 mb-6 flex-1">Consultez nos tarifs, délais et modalités de paiement en toute transparence.</p>
              <div className="flex items-center gap-2 text-dore text-xs font-semibold uppercase tracking-widest">
                En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </Animer>

          <Animer delay={200}>
            <Link href="/guide-tailles" className="group flex flex-col h-full p-6 md:p-8 bg-creme/20 border border-beige/50 rounded-sm hover:border-dore/50 hover:bg-creme/40 transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-ivoire rounded-full flex items-center justify-center text-dore mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Ruler className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-brun mb-2">Guide des tailles</h3>
              <p className="text-sm text-brun/60 mb-6 flex-1">Trouvez la taille parfaite pour votre silhouette avant de valider votre commande.</p>
              <div className="flex items-center gap-2 text-dore text-xs font-semibold uppercase tracking-widest">
                Voir le guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </Animer>

          <Animer delay={300}>
            <Link href="#temoignages" className="group flex flex-col h-full p-6 md:p-8 bg-brun text-ivoire rounded-sm hover:bg-brun/90 transition-all duration-300 shadow-md">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-ivoire/10 rounded-full flex items-center justify-center text-dore mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl mb-2">Avis Clientes</h3>
              <p className="text-sm text-ivoire/70 mb-6 flex-1">Découvrez ce que nos clientes pensent de la qualité de nos articles et de nos finitions.</p>
              <div className="flex items-center gap-2 text-dore text-xs font-semibold uppercase tracking-widest">
                Lire les avis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </Animer>

        </div>
      </div>
    </section>
  );
}