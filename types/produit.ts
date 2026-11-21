export type Disponibilite = "en-stock" | "sur-commande" | "epuise";

export interface Produit {
  identifiant: string;
  nom: string;
  description: string;
  prix: number;
  categorie: string;
  images: string[];
  tailles?: string[];
  couleurs?: string[];
  disponibilite: Disponibilite;
  miseEnAvant: boolean;
}

export interface Categorie {
  identifiant: string;
  nom: string;
}