import { Header } from "@/composants/Header";
import { Footer } from "@/composants/Footer";
import { Categories } from "@/sections/Categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catégories | Nour_élégance",
  description: "Découvrez toutes les catégories de vêtements Nour_élégance.",
};

export default function PageCategories() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivoire min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl md:text-5xl text-brun mb-8 text-center">Nos Catégories</h1>
          <Categories />
        </div>
      </main>
      <Footer />
    </>
  );
}