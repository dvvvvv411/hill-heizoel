
export const TAX_RATE = 0.19; // 19% MwSt in Germany

export const calculateTaxAmount = (netAmount: number): number => {
  return netAmount * TAX_RATE;
};

export const calculateNetAmount = (grossAmount: number): number => {
  return grossAmount / (1 + TAX_RATE);
};

export const calculateGrossAmount = (netAmount: number): number => {
  return netAmount * (1 + TAX_RATE);
};

export const formatPrice = (amount: number): string => {
  return amount.toFixed(2);
};
