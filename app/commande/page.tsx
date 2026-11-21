import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { FormulaireCommande } from "@/fonctionnalites/commande/FormulaireCommande";

export default function PageCommande() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-brun mb-8 text-center">Finaliser ma commande</h1>
          <FormulaireCommande />
        </div>
      </main>
      <Footer />
    </>
  );
}