import { marque } from "@/configuration/marque";
import { Animer } from "@/composants/Animer";

export function Presentation() {
  return (
    <section className="py-20 px-4 bg-ivoire">
      <Animer>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-px bg-dore mx-auto mb-8"></div>
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-brun">
            « {marque.presentation} »
          </p>
        </div>
      </Animer>
    </section>
  );
}