export interface LignePanier {
  identifiantProduit: string;
  nom: string;
  prix: number;
  image: string;
  taille: string | null;
  couleur: string | null;
  quantite: number;
}