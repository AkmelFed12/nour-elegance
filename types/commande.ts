export interface InformationsClient {
  nomComplet: string;
  telephone: string;
  email?: string;
  ville: string;
  autreVille?: string; // <-- LIGNE AJOUTÉE ICI
  adresseLivraison: string;
  moyenPaiement: "wave" | "mtn";
  numeroPaiement: string;
  informationsComplementaires?: string;
}