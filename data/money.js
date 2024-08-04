export function formatCurrency(PriceCents) {
  return (Math.round(PriceCents) / 100).toFixed(2);
}
