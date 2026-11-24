import Link from "next/link";
import { Truck, Ruler, Star } from "lucide-react";
import { Animer } from "@/composants/Animer";

export function InfosPratiques() {
  return (
    <section className="py-16 md:py-20 px-4 bg-ivoire">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          <Animer delay={100}>
            <Link href="/livraison" className="group block h-full p-8 bg-creme/20 border border-beige/50 rounded-sm hover:border-dore/50 hover:bg-creme/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-ivoire rounded-full flex items-center justify-center text-dore mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck size={28} />
              </div>
              <h3 className="font-serif text-xl text-brun mb-2">Livraison & Paiement</h3>
              <p className="text-sm text-brun/60">Consultez nos tarifs, délais et modalités de paiement en toute transparence.</p>
            </Link>
          </Animer>

          <Animer delay={200}>
            <Link href="/guide-tailles" className="group block h-full p-8 bg-creme/20 border border-beige/50 rounded-sm hover:border-dore/50 hover:bg-creme/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-ivoire rounded-full flex items-center justify-center text-dore mb-6 group-hover:scale-110 transition-transform duration-300">
                <Ruler size={28} />
              </div>
              <h3 className="font-serif text-xl text-brun mb-2">Guide des tailles</h3>
              <p className="text-sm text-brun/60">Trouvez la taille parfaite pour votre silhouette avant de valider votre commande.</p>
            </Link>
          </Animer>

          <Animer delay={300}>
            <Link href="#temoignages" className="group block h-full p-8 bg-creme/20 border border-beige/50 rounded-sm hover:border-dore/50 hover:bg-creme/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-ivoire rounded-full flex items-center justify-center text-dore mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star size={28} />
              </div>
              <h3 className="font-serif text-xl text-brun mb-2">Avis Clientes</h3>
              <p className="text-sm text-brun/60">Découvrez ce que nos clientes pensent de la qualité de nos articles.</p>
            </Link>
          </Animer>

        </div>
      </div>
    </section>
  );
}