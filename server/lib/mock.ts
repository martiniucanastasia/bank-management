import { AccountClass } from "./account";
import { Currency } from "./types";

export const createMockAccounts = () => {
  return [
    new AccountClass(1, "USD", 300, "Nick"),
    new AccountClass(2, "EUR", 500, "Anastasia"),
    new AccountClass(3, "GBP", 800, "Tom"),
    new AccountClass(4, "GBP", 1000, "Julia"),
  ];
};

export const conversionRates: Record<Currency, Record<Currency, number>> = {
  USD: { EUR: 0.92, GBP: 0.79, USD: 1 },
  EUR: { USD: 1.09, GBP: 0.86, EUR: 1 },
  GBP: { USD: 1.27, EUR: 1.16, GBP: 1 },
};
