"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePanier } from "@/fonctionnalites/panier/ContextePanier";
import { formaterPrix } from "@/utilitaires/formatage";
import { contact } from "@/configuration/contact";
import { IconeWhatsApp } from "@/composants/IconeWhatsApp";
import { InformationsClient } from "@/types/commande";
import { ShieldCheck, CreditCard } from "lucide-react";

const schemaClient = z.object({
  nomComplet: z.string().min(2, "Le nom est requis"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  ville: z.string().min(2, "La ville/commune est requise"),
  adresseLivraison: z.string().min(5, "L'adresse est requise"),
  moyenPaiement: z.enum(["wave", "mtn"]),
  numeroPaiement: z.string().min(8, "Le numéro utilisé pour le paiement est requis"),
  informationsComplementaires: z.string().optional(),
});

export function FormulaireCommande() {
  const { lignes, sousTotal, viderPanier } = usePanier();
  const [estEnvoye, setEstEnvoye] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<InformationsClient>({
    resolver: zodResolver(schemaClient),
    defaultValues: {
      moyenPaiement: "wave",
    }
  });

  const moyenPaiementSelectionne = watch("moyenPaiement");

  if (lignes.length === 0 && !estEnvoye) {
    return (
      <div className="text-center py-20 bg-creme/30 rounded-sm">
        <p className="text-brun/60 text-lg mb-4">Votre panier est vide, vous ne pouvez pas passer de commande.</p>
      </div>
    );
  }

  const onSubmit = (donnees: InformationsClient) => {
    const numDepot = donnees.moyenPaiement === "wave" ? contact.paiements.wave : contact.paiements.mtn;
    const nomMoyen = donnees.moyenPaiement === "wave" ? "Wave" : "MTN Money";

    let message = `Nouvelle commande Nour_élégance :\n\n`;
    message += `Nom : ${donnees.nomComplet}\n`;
    message += `Téléphone : ${donnees.telephone}\n`;
    if (donnees.email) message += `Email : ${donnees.email}\n`;
    message += `Ville : ${donnees.ville}\n`;
    message += `Adresse : ${donnees.adresseLivraison}\n`;
    if (donnees.informationsComplementaires) {
      message += `Infos : ${donnees.informationsComplementaires}\n`;
    }

    message += `\n--- Paiement ---\n`;
    message += `Moyen de paiement : ${nomMoyen}\n`;
    message += `Dépôt effectué au : ${numDepot}\n`;
    message += `Mon numéro de paiement : ${donnees.numeroPaiement}\n`;

    message += `\n--- Articles ---\n`;
    lignes.forEach((ligne) => {
      message += `- ${ligne.nom} (x${ligne.quantite}) : ${formaterPrix(ligne.prix * ligne.quantite)}\n`;
      if (ligne.couleur) message += `  Couleur : ${ligne.couleur}\n`;
      if (ligne.taille) message += `  Taille : ${ligne.taille}\n`;
    });

    message += `\nSous-total : ${formaterPrix(sousTotal)}\n`;
    message += `Les frais de livraison seront confirmés.\n\n`;
    message += `⚠️ IMPORTANT : Merci de joindre la capture d'écran de votre transaction en pièce jointe de ce message pour valider la commande.\n\n`;
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
        <p className="text-brun/70 max-w-lg mx-auto mb-6">
          Votre commande a été transmise à Nour_élégance via WhatsApp. 
          Elle sera considérée comme confirmée uniquement après validation de votre paiement et de la capture d'écran par la boutique.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-3/5 space-y-6 bg-creme/20 p-6 md:p-8 rounded-sm border border-beige/50">
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

        <div className="pt-4 border-t border-beige/50">
          <h2 className="font-serif text-2xl text-brun mb-4 flex items-center gap-2">
            <CreditCard size={24} className="text-dore" />
            Paiement
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Choisissez votre moyen de paiement *</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 border rounded-sm cursor-pointer transition-colors ${moyenPaiementSelectionne === "wave" ? "border-dore bg-creme/50" : "border-beige hover:bg-creme/20"}`}>
                  <input type="radio" value="wave" {...register("moyenPaiement")} className="hidden" />
                  <div className="relative w-16 h-8">
                    <Image src="/images/marque/wave.jpg" alt="Wave" fill sizes="64px" className="object-contain" />
                  </div>
                  <span className={`text-sm ${moyenPaiementSelectionne === "wave" ? "text-brun font-medium" : "text-brun/60"}`}>Wave</span>
                </label>
                <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 border rounded-sm cursor-pointer transition-colors ${moyenPaiementSelectionne === "mtn" ? "border-dore bg-creme/50" : "border-beige hover:bg-creme/20"}`}>
                  <input type="radio" value="mtn" {...register("moyenPaiement")} className="hidden" />
                  <div className="relative w-16 h-8">
                    <Image src="/images/marque/mtn.png" alt="MTN Money" fill sizes="64px" className="object-contain" />
                  </div>
                  <span className={`text-sm ${moyenPaiementSelectionne === "mtn" ? "text-brun font-medium" : "text-brun/60"}`}>MTN Money</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-ivoire border border-beige rounded-sm text-sm text-brun/80 space-y-2">
              <p>1. Ouvrez votre application {moyenPaiementSelectionne === "wave" ? "Wave" : "MTN Money"}.</p>
              <p>2. Envoyez <strong>{formaterPrix(sousTotal)}</strong> au numéro :</p>
              <p className="font-bold text-lg text-brun tracking-wider">
                {moyenPaiementSelectionne === "wave" ? contact.paiements.wave : contact.paiements.mtn}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Numéro utilisé pour le paiement *</label>
              <input {...register("numeroPaiement")} placeholder="Ex: 0700000000" className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
              {errors.numeroPaiement && <span className="text-red-500 text-xs">{errors.numeroPaiement.message}</span>}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Informations complémentaires</label>
          <textarea {...register("informationsComplementaires")} rows={3} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none resize-none"></textarea>
        </div>

        <div className="pt-4 border-t border-beige/50">
          <button type="submit" className="w-full bg-brun text-ivoire py-4 uppercase tracking-widest text-sm hover:bg-dore transition-colors flex items-center justify-center gap-2 rounded-sm">
            <IconeWhatsApp className="w-5 h-5" />
            Envoyez les preuves de la commande
          </button>
          <p className="text-xs text-center text-brun/60 flex items-center justify-center gap-1 mt-4">
            <ShieldCheck size={14} /> N'oubliez pas de joindre votre capture d'écran sur WhatsApp.
          </p>
        </div>
      </form>

      <div className="w-full lg:w-2/5">
        <div className="bg-brun text-ivoire p-6 md:p-8 rounded-sm space-y-6 sticky top-24">
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
              <span>Total à payer</span>
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