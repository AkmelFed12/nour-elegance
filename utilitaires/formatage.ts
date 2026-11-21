export function formaterPrix(montant: number): string {
  const nombre = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(montant);
  return `${nombre} FCFA`;
}