import { AccountInterface } from "./types";

export class AccountClass implements AccountInterface {
  id: number;
  currency: string;
  balance: number;
  name: string;
  constructor(id: number, currency: string, balance: number, name: string) {
    this.id = id;
    this.currency = currency;
    this.balance = balance;
    this.name = name;
  }
}
