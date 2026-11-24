import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { Hero } from "@/sections/Hero";
import { Presentation } from "@/sections/Presentation";
import { Categories } from "@/sections/Categories";
import { ProduitsEnAvant } from "@/sections/ProduitsEnAvant";
import { Temoignages } from "@/sections/Temoignages";

export default function Accueil() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Presentation />
        <Categories />
        <ProduitsEnAvant />
        <Temoignages />
      </main>
      <Footer />
    </>
  );
}