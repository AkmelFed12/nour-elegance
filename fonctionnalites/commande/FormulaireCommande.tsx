"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePanier } from "@/fonctionnalites/panier/ContextePanier";
import { formaterPrix } from "@/utilitaires/formatage";
import { contact } from "@/configuration/contact";
import { IconeWhatsApp } from "@/composants/IconeWhatsApp";
import { InformationsClient } from "@/types/commande";
import { ShieldCheck } from "lucide-react";

const schemaClient = z.object({
  nomComplet: z.string().min(2, "Le nom est requis"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  ville: z.string().min(2, "La ville/commune est requise"),
  adresseLivraison: z.string().min(5, "L'adresse est requise"),
  informationsComplementaires: z.string().optional(),
});

export function FormulaireCommande() {
  const { lignes, sousTotal, viderPanier } = usePanier();
  const [estEnvoye, setEstEnvoye] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<InformationsClient>({
    resolver: zodResolver(schemaClient),
  });

  if (lignes.length === 0 && !estEnvoye) {
    return (
      <div className="text-center py-20 bg-creme/30 rounded-sm">
        <p className="text-brun/60 text-lg mb-4">Votre panier est vide, vous ne pouvez pas passer de commande.</p>
      </div>
    );
  }

  const onSubmit = (donnees: InformationsClient) => {
    let message = `Nouvelle commande Nour_élégance :\n\n`;
    message += `Nom : ${donnees.nomComplet}\n`;
    message += `Téléphone : ${donnees.telephone}\n`;
    if (donnees.email) message += `Email : ${donnees.email}\n`;
    message += `Ville : ${donnees.ville}\n`;
    message += `Adresse : ${donnees.adresseLivraison}\n`;
    if (donnees.informationsComplementaires) {
      message += `Infos : ${donnees.informationsComplementaires}\n`;
    }

    message += `\n--- Articles ---\n`;
    lignes.forEach((ligne) => {
      message += `- ${ligne.nom} (x${ligne.quantite}) : ${formaterPrix(ligne.prix * ligne.quantite)}\n`;
      if (ligne.couleur) message += `  Couleur : ${ligne.couleur}\n`;
      if (ligne.taille) message += `  Taille : ${ligne.taille}\n`;
    });

    message += `\nSous-total : ${formaterPrix(sousTotal)}\n`;
    message += `Les frais de livraison seront confirmés.\n\n`;
    message += `Merci de confirmer ma commande !`;

    const lienWhatsApp = `https://wa.me/${contact.whatsapp.numeroInternational}?text=${encodeURIComponent(message)}`;
    
    viderPanier();
    setEstEnvoye(true);
    window.open(lienWhatsApp, "_blank");
  };

  if (estEnvoye) {
    return (
      <div className="text-center py-20 bg-creme/30 rounded-sm">
        <h2 className="font-serif text-3xl text-brun mb-4">Merci pour votre commande !</h2>
        <p className="text-brun/70 max-w-lg mx-auto">
          Votre commande a été transmise à Nour_élégance via WhatsApp. 
          Elle sera considérée comme confirmée uniquement après validation par la boutique.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-3/5 space-y-6 bg-creme/20 p-8 rounded-sm border border-beige/50">
        <h2 className="font-serif text-2xl text-brun mb-4">Vos coordonnées</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom complet *</label>
            <input {...register("nomComplet")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            {errors.nomComplet && <span className="text-red-500 text-xs">{errors.nomComplet.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone (WhatsApp) *</label>
            <input {...register("telephone")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            {errors.telephone && <span className="text-red-500 text-xs">{errors.telephone.message}</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email (facultatif)</label>
          <input type="email" {...register("email")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Commune / Ville *</label>
            <input {...register("ville")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            {errors.ville && <span className="text-red-500 text-xs">{errors.ville.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adresse de livraison *</label>
            <input {...register("adresseLivraison")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            {errors.adresseLivraison && <span className="text-red-500 text-xs">{errors.adresseLivraison.message}</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Informations complémentaires</label>
          <textarea {...register("informationsComplementaires")} rows={3} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none resize-none"></textarea>
        </div>

        <button type="submit" className="w-full bg-brun text-ivoire py-4 uppercase tracking-widest text-sm hover:bg-dore transition-colors flex items-center justify-center gap-2 rounded-sm mt-4">
          <IconeWhatsApp className="w-5 h-5" />
          Valider et envoyer sur WhatsApp
        </button>
        <p className="text-xs text-center text-brun/60 flex items-center justify-center gap-1">
          <ShieldCheck size={14} /> Votre commande sera confirmée uniquement après validation par la boutique.
        </p>
      </form>

      <div className="w-full lg:w-2/5">
        <div className="bg-brun text-ivoire p-8 rounded-sm space-y-6 sticky top-24">
          <h2 className="font-serif text-2xl border-b border-ivoire/20 pb-4">Récapitulatif</h2>
          
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {lignes.map((ligne) => (
              <div key={ligne.identifiantProduit} className="flex justify-between items-center text-sm border-b border-ivoire/10 pb-2 last:border-0">
                <div>
                  <p className="font-medium">{ligne.nom}</p>
                  <p className="opacity-70 text-xs">
                    Qté : {ligne.quantite} {ligne.couleur ? `| ${ligne.couleur}` : ""}
                  </p>
                </div>
                <span className="font-serif">{formaterPrix(ligne.prix * ligne.quantite)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-ivoire/20 space-y-2">
            <div className="flex justify-between text-lg">
              <span>Sous-total</span>
              <span className="font-serif text-xl">{formaterPrix(sousTotal)}</span>
            </div>
            <p className="text-xs opacity-70">
              Frais de livraison à confirmer sur WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}