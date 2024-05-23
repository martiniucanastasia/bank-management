export type Currency = "USD" | "EUR" | "GBP";

export type Account = {
  id: number;
  currency: Currency;
  balance: number;
  name: string;
};
