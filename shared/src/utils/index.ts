export const formatMoney = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
}).format;
