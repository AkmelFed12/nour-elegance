import { temoignages } from "@/donnees/temoignages";
import { Animer } from "@/composants/Animer";
import { Star, MessageSquareQuote } from "lucide-react";

export function Temoignages() {
  return (
    <section className="py-20 md:py-28 px-4 bg-creme/40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <Animer>
          <div className="text-center mb-12">
            <MessageSquareQuote size={40} className="text-dore mx-auto mb-6 opacity-50" />
            <h2 className="font-serif text-3xl md:text-4xl text-brun">Elles nous font confiance</h2>
          </div>
        </Animer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {temoignages.map((temoignage, index) => (
            <Animer key={temoignage.id} delay={index * 150}>
              <div className="bg-ivoire p-8 rounded-sm shadow-sm border border-beige/30 h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-dore">
                    {[...Array(temoignage.note)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-serif text-lg md:text-xl text-brun/80 italic leading-relaxed mb-6">
                    « {temoignage.texte} »
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-px bg-dore"></div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-brun">
                    {temoignage.nom}
                  </span>
                </div>
              </div>
            </Animer>
          ))}
        </div>
      </div>
    </section>
  );
}