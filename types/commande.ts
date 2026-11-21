export interface InformationsClient {
  nomComplet: string;
  telephone: string;
  email?: string;
  ville: string;
  adresseLivraison: string;
  moyenPaiement: "wave" | "mtn";
  numeroPaiement: string;
  informationsComplementaires?: string;
}