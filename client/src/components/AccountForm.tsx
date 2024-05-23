import { useState } from "react";
import { Currency } from "../lib/types";

interface AccountCreationFormProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  createAccount: (
    newName: string,
    newCurrency: Currency,
    newBalance: number
  ) => Promise<void>;
}

export const AccountForm = ({
  createAccount,
  setError,
}: AccountCreationFormProps) => {
  const [newName, setNewName] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [newCurrency, setNewCurrency] = useState<Currency>("USD");

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewCurrency(e.target.value as Currency);
  };

  const handleCreateAccount = () => {
    if (!newName || !newCurrency || !newBalance) {
      setError("Please fill out all fields.");
      return;
    }

    if (parseInt(newBalance) <= 0) {
      setError("Balance must be a positive number.");
      return;
    }

    createAccount(newName, newCurrency, parseInt(newBalance));
    setNewName("");
    setNewBalance("");
    setNewCurrency("USD");
    setError("");
  };

  return (
    <div className="creation-wrapper">
      <h3>Create Account</h3>
      <input
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <div className="creation-balance">
        <input
          type="number"
          placeholder="0"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
        />
        <select name="currency" onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};
