export interface AccountInterface {
  id: number;
  currency: string;
  balance: number;
  name: string;
}

export type Currency = "USD" | "EUR" | "GBP";
