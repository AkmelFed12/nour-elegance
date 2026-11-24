import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { livraison } from "@/configuration/livraison";
import { formaterPrix } from "@/utilitaires/formatage";
import { Truck, Clock, CreditCard, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison & Paiement | Nour_élégance",
  description: "Informations sur les frais de livraison, les délais et les modalités de paiement.",
};

export default function PageLivraison() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-brun mb-12 text-center">Livraison & Paiement</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            <div className="space-y-8">
              <div className="bg-creme/20 p-6 md:p-8 rounded-sm border border-beige/50">
                <h2 className="font-serif text-2xl text-brun mb-4 flex items-center gap-2">
                  <Truck className="text-dore" /> Tarifs Abidjan
                </h2>
                <ul className="space-y-2 text-sm text-brun/80">
                  {Object.entries(livraison.abidjan).map(([commune, prix]) => (
                    <li key={commune} className="flex justify-between border-b border-beige/30 pb-1 last:border-0 last:pb-0">
                      <span>{commune}</span>
                      <span className="font-medium">{formaterPrix(prix)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-creme/20 p-6 md:p-8 rounded-sm border border-beige/50">
                <h2 className="font-serif text-2xl text-brun mb-4 flex items-center gap-2">
                  <Clock className="text-dore" /> Expédition & Délais
                </h2>
                <p className="text-sm text-brun/80 mb-4">
                  <strong>Hors Abidjan :</strong> À partir de {formaterPrix(livraison.expeditionMinimum)}.
                </p>
                <ul className="space-y-2 text-sm text-brun/80 list-disc pl-5">
                  <li>Abidjan : {livraison.delais.abidjan}</li>
                  <li>Intérieur du pays : {livraison.delais.interieur}</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-brun text-ivoire p-6 md:p-8 rounded-sm">
                <h2 className="font-serif text-2xl mb-4 flex items-center gap-2 text-dore">
                  <CreditCard /> Modalités de Paiement
                </h2>
                <div className="space-y-6 text-sm text-ivoire/90">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">Pour les articles en stock :</h3>
                    <p>Une avance de <strong>la moitié du montant</strong> est demandée. Le reste sera payé à la livraison.</p>
                  </div>
                  <div className="w-full h-px bg-ivoire/20"></div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">Pour la confection (sur commande) :</h3>
                    <p>Le paiement de <strong>la totalité</strong> est requis avant le début de la confection, car l'article n'est pas disponible en stock.</p>
                  </div>
                  <div className="w-full h-px bg-ivoire/20"></div>
                  <p className="flex items-center gap-2 text-xs">
                    <ShieldCheck size={16} className="text-dore shrink-0" />
                    Moyens acceptés : Wave et MTN Money.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}