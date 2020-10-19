const formatter = Intl.NumberFormat('pl', {
  style: 'currency',
  currency: 'PLN',
  currencyDisplay: 'symbol',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
