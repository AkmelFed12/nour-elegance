"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePanier } from "@/fonctionnalites/panier/ContextePanier";
import { formaterPrix } from "@/utilitaires/formatage";
import { contact } from "@/configuration/contact";
import { livraison } from "@/configuration/livraison";
import { produits } from "@/donnees/produits";
import { IconeWhatsApp } from "@/composants/IconeWhatsApp";
import { InformationsClient } from "@/types/commande";
import { ShieldCheck, CreditCard, Truck } from "lucide-react";

const schemaClient = z.object({
  nomComplet: z.string().min(2, "Le nom est requis"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  ville: z.string().min(1, "La ville/commune est requise"),
  autreVille: z.string().optional(),
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
      ville: "Treichville",
    }
  });

  const moyenPaiementSelectionne = watch("moyenPaiement");
  const villeSelectionnee = watch("ville");
  const autreVilleSaisie = watch("autreVille");

  const estAutreVille = villeSelectionnee === "Autre";

  let fraisLivraisonNombre = 0;
  let labelFraisLivraison = "";
  let labelVille = villeSelectionnee;

  if (estAutreVille) {
    fraisLivraisonNombre = livraison.expeditionMinimum;
    labelFraisLivraison = `À partir de ${formaterPrix(fraisLivraisonNombre)}`;
    labelVille = autreVilleSaisie || "Hors Abidjan (À préciser)";
  } else {
    fraisLivraisonNombre = livraison.abidjan[villeSelectionnee] || 0;
    labelFraisLivraison = formaterPrix(fraisLivraisonNombre);
    labelVille = `Abidjan - ${villeSelectionnee}`;
  }

  const totalGeneral = sousTotal + fraisLivraisonNombre;

  const calculerMontantAPayer = () => {
    let montant = 0;
    lignes.forEach(ligne => {
      const produitRef = produits.find(p => p.identifiant === ligne.identifiantProduit);
      const totalLigne = ligne.prix * ligne.quantite;
      if (produitRef?.disponibilite === "sur-commande") {
        montant += totalLigne;
      } else {
        montant += totalLigne / 2;
      }
    });
    return montant;
  };

  const montantAPayerMaintenant = calculerMontantAPayer();

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
    const villeComplete = estAutreVille ? `${donnees.autreVille} (Hors Abidjan)` : `Abidjan - ${donnees.ville}`;

    let message = `*NOUVELLE COMMANDE – NOUR_ÉLÉGANCE*\n\n`;
    message += `Bonjour Nour_élégance,\n`;
    message += `Je souhaite passer une commande. Voici les informations nécessaires à son traitement.\n\n`;

    message += `*1. INFORMATIONS DU CLIENT*\n`;
    message += `- Nom complet : ${donnees.nomComplet}\n`;
    message += `- Téléphone : ${donnees.telephone}\n`;
    if (donnees.email) message += `- E-mail : ${donnees.email}\n`;
    message += `- Ville / Commune : ${villeComplete}\n`;
    message += `- Adresse de livraison : ${donnees.adresseLivraison}\n`;
    if (donnees.informationsComplementaires) {
      message += `- Infos complémentaires : ${donnees.informationsComplementaires}\n`;
    }
    message += `\n`;

    message += `*2. INFORMATIONS DE PAIEMENT*\n`;
    message += `- Moyen de paiement : ${nomMoyen}\n`;
    message += `- Numéro destinataire : ${numDepot}\n`;
    message += `- Numéro utilisé : ${donnees.numeroPaiement}\n`;
    message += `- Montant payé (avance/totalité) : ${formaterPrix(montantAPayerMaintenant)}\n\n`;

    message += `*3. DÉTAILS DE LA COMMANDE*\n`;
    lignes.forEach((ligne) => {
      let details = `${ligne.quantite} x ${ligne.nom}`;
      const options = [];
      if (ligne.couleur) options.push(ligne.couleur);
      if (ligne.taille) options.push(ligne.taille);
      if (options.length > 0) details += ` (${options.join(', ')})`;
      details += ` : ${formaterPrix(ligne.prix)} / unité\n`;
      message += `- ${details}`;
    });
    message += `\n`;

    message += `*RÉCAPITULATIF*\n`;
    message += `Sous-total : ${formaterPrix(sousTotal)}\n`;
    
    if (estAutreVille) {
      message += `Frais de livraison (${villeComplete}) : À partir de 2 500 FCFA (Le tarif exact sera confirmé selon votre localisation)\n`;
      message += `Total provisoire : ${formaterPrix(totalGeneral)}\n\n`;
    } else {
      message += `Frais de livraison (${villeComplete}) : ${formaterPrix(fraisLivraisonNombre)}\n`;
      message += `Total général : ${formaterPrix(totalGeneral)}\n\n`;
    }

    message += `*4. JUSTIFICATIF DE PAIEMENT*\n`;
    message += `Je joins à ce message la capture d'écran de ma transaction comme preuve de paiement.\n\n`;

    message += `Merci de bien vouloir vérifier le paiement, confirmer la réception de ma commande et m'informer des éventuels frais de livraison.\n\n`;
    message += `Cordialement,\n${donnees.nomComplet}`;

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
            <label className="block text-sm font-medium mb-1">Ville / Commune (Livraison) *</label>
            <select {...register("ville")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none bg-white">
              <optgroup label="Abidjan">
                {Object.keys(livraison.abidjan).map(v => (
                  <option key={v} value={v}>{v} ({formaterPrix(livraison.abidjan[v])})</option>
                ))}
              </optgroup>
              <optgroup label="Hors Abidjan">
                <option value="Autre">Autre ville (Expédition à partir de 2500 F)</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {estAutreVille ? "Précisez votre ville *" : "Adresse précise *"}
            </label>
            {estAutreVille ? (
              <input {...register("autreVille")} placeholder="Ex: Bouaké, Yamoussoukro..." className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            ) : (
              <input {...register("adresseLivraison")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            )}
            {errors.adresseLivraison && !estAutreVille && <span className="text-red-500 text-xs">{errors.adresseLivraison.message}</span>}
          </div>
        </div>
        
        {estAutreVille && (
          <div>
            <label className="block text-sm font-medium mb-1">Quartier / Adresse précise *</label>
            <input {...register("adresseLivraison")} className="w-full p-2.5 border border-beige rounded-sm focus:border-dore outline-none" />
            {errors.adresseLivraison && <span className="text-red-500 text-xs">{errors.adresseLivraison.message}</span>}
          </div>
        )}

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
                </label>
                <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 border rounded-sm cursor-pointer transition-colors ${moyenPaiementSelectionne === "mtn" ? "border-dore bg-creme/50" : "border-beige hover:bg-creme/20"}`}>
                  <input type="radio" value="mtn" {...register("moyenPaiement")} className="hidden" />
                  <div className="relative w-16 h-8">
                    <Image src="/images/marque/mtn.png" alt="MTN Money" fill sizes="64px" className="object-contain" />
                  </div>
                </label>
              </div>
            </div>

            <div className="p-4 bg-ivoire border border-beige rounded-sm text-sm text-brun/80 space-y-2">
              <p className="font-medium text-brun">Montant à verser maintenant : <span className="font-serif text-lg">{formaterPrix(montantAPayerMaintenant)}</span></p>
              <p className="text-xs text-brun/60">(Totalité pour les articles sur commande, moitié pour ceux en stock)</p>
              <p className="pt-2">1. Ouvrez votre application {moyenPaiementSelectionne === "wave" ? "Wave" : "MTN Money"}.</p>
              <p>2. Envoyez ce montant au numéro :</p>
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

          <div className="pt-4 border-t border-ivoire/20 space-y-2 text-sm">
            <div className="flex justify-between opacity-80">
              <span>Sous-total</span>
              <span>{formaterPrix(sousTotal)}</span>
            </div>
            <div className="flex justify-between items-center opacity-80">
              <span className="flex items-center gap-1"><Truck size={14} /> Livraison ({labelVille})</span>
              <span>{estAutreVille ? labelFraisLivraison : formaterPrix(fraisLivraisonNombre)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium pt-2 border-t border-ivoire/20">
              <span>{estAutreVille ? "Total provisoire" : "Total général"}</span>
              <span className="font-serif text-xl text-dore">{formaterPrix(totalGeneral)}</span>
            </div>
            {estAutreVille && (
              <p className="text-xs text-dore/80 italic mt-1">
                * Le tarif exact de l'expédition vous sera confirmé sur WhatsApp.
              </p>
            )}
            
            <div className="mt-4 p-3 bg-ivoire/10 rounded-sm">
              <p className="text-xs text-dore uppercase tracking-widest font-semibold mb-1">À payer maintenant</p>
              <p className="font-serif text-2xl">{formaterPrix(montantAPayerMaintenant)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}