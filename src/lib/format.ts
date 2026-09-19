const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const formatPrice = (pence: number) => gbp.format(pence / 100);
