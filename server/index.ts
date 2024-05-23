import express from "express";
import cors from "cors";
import type { AccountInterface, Currency } from "./lib/types";
import { createMockAccounts, conversionRates } from "./lib/mock";
import { AccountClass } from "./lib/account";

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());

let ACCOUNTS: AccountInterface[] = [];

app.listen(PORT, () => {
  console.log(`LOG: Starting server on :${PORT}`);
  ACCOUNTS = createMockAccounts();
  console.log(`LOG: Created mock accounts in server memory`);
});

app.get("/accounts", (req, res) => {
  return res.send(ACCOUNTS);
});

app.post("/accounts", (req, res) => {
  let { name, currency, balance } = req.body;

  ACCOUNTS = [
    ...ACCOUNTS,
    new AccountClass(ACCOUNTS.length + 1, currency, balance, name),
  ];

  return res.send(ACCOUNTS);
});

app.put("/accounts/:id", (req, res) => {
  const { id } = req.params;
  let { name, balance } = req.body;
  ACCOUNTS = ACCOUNTS.map((account) => {
    if (account.id === parseInt(id)) {
      account.name = name;
      account.balance = balance;
    }
    return account;
  });

  return res.send(ACCOUNTS);
});

app.delete("/accounts/:id", (req, res) => {
  const { id } = req.params;

  ACCOUNTS = ACCOUNTS.filter((account) => {
    return account.id !== parseInt(id);
  });
  return res.send(ACCOUNTS);
});

app.post("/transfer", (req, res) => {
  try {
    let { from, to, amount } = req.body;
    if (!from || !to || !amount) {
      throw new Error(
        "Invalid transfer data: 'from', 'to', and 'amount' are required"
      );
    }

    amount = parseInt(amount);

    let sender = ACCOUNTS.find((account) => account.id === from);
    let receiver = ACCOUNTS.find((account) => account.id === to);

    if (!sender || !receiver) {
      return res.status(400).send("Sender or receiver not found");
    }

    if (amount > sender.balance) {
      return res.status(400).send("Insufficient balance");
    }

    if (amount <= 0) {
      return res.status(400).send("Sorry, you can not use negative amount");
    }

    const senderCurrency = sender.currency as Currency;
    const receiverCurrency = receiver.currency as Currency;

    if (
      !conversionRates[senderCurrency] ||
      !conversionRates[senderCurrency][receiverCurrency]
    ) {
      return res.status(400).send("Unsupported currency conversion");
    }

    const updatedAccounts = ACCOUNTS.map((account) => {
      if (account.id === from) {
        return { ...account, balance: account.balance - amount };
      } else if (account.id === to) {
        const convertedAmount =
          amount * conversionRates[senderCurrency][receiverCurrency];
        return { ...account, balance: account.balance + convertedAmount };
      } else {
        return account;
      }
    });

    ACCOUNTS = updatedAccounts;

    console.log(`LOG: ${sender.name} sent ${amount} to ${receiver.name}`);
    return res.status(200).send("Transfer successful");
  } catch (error) {
    console.log("LOG: Error during transfer: ", error);
    return res.status(400).send("Error during transfer: " + error);
  }
});
