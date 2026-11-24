import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide des tailles | Nour_élégance",
  description: "Trouvez la taille qui vous correspond chez Nour_élégance.",
};

export default function PageGuideTailles() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire py-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-brun mb-8 text-center">Guide des tailles</h1>
          
          <div className="bg-creme/20 p-8 rounded-sm border border-beige/50 space-y-6">
            <p className="text-brun/70 leading-relaxed text-center mb-8">
              Nos vêtements sont principalement proposés en <strong>Taille Standard</strong>. 
              Cette taille unique s'adapte à la majorité des silhouettes (du 36 au 42) grâce à des coupes fluides et ajustables.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-brun/80 border-collapse">
                <thead className="text-xs uppercase bg-beige/50 text-brun">
                  <tr>
                    <th className="px-4 py-3">Taille</th>
                    <th className="px-4 py-3">Correspondance</th>
                    <th className="px-4 py-3">Tour de poitrine</th>
                    <th className="px-4 py-3">Tour de taille</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-ivoire border-b border-beige/30">
                    <td className="px-4 py-4 font-medium">Standard</td>
                    <td className="px-4 py-4">36 / 38 / 40 / 42</td>
                    <td className="px-4 py-4">86 cm - 100 cm</td>
                    <td className="px-4 py-4">68 cm - 82 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-xs text-brun/60 text-center mt-6">
              Si vous avez un doute ou si vous souhaitez des mesures exactes pour un article précis, 
              n'hésitez pas à nous contacter sur WhatsApp avant de commander.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}