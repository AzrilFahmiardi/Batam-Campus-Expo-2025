export function formatCurrency(amount) {
  if (!amount) return 0;
  const reversed = amount.toString().split("").reverse().join("");
  const formatted = reversed.match(/.{1,3}/g).join(".");
  return formatted.split("").reverse().join("");
}
