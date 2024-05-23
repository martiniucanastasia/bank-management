import { useEffect, useState } from "react";
import { Account, Currency } from "./lib/types";
import { AccountForm } from "./components/AccountForm";
import { TransactionForm } from "./components/TransactionForm";
import { AccountsList } from "./components/AccountsList";
import { API_URL } from "./lib/constants";
import { ErrorBanner } from "./components/ErrorBanner";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sender, setSender] = useState<number | null>(null);
  const [receiver, setReceiver] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const fetchAccounts = async () => {
    const response = await fetch(`${API_URL}/accounts`);
    const json = await response.json();
    setAccounts(json);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSenderId = parseInt(e.target.value);
    setSender(selectedSenderId);
    setReceiver(null);
  };

  const handleReceiverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReceiverId = parseInt(e.target.value);
    setReceiver(selectedReceiverId);
  };

  const handleTransfer = async () => {
    if (!sender || !receiver || !amount) {
      setError("Please select sender, receiver account and enter the amount");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: sender,
          to: receiver,
          amount: amount,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else {
        fetchAccounts();
        setError("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleDeleteAccount = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/accounts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else {
        fetchAccounts();
        setError("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleCreateAccount = async (
    name: string,
    currency: Currency,
    balance: number
  ) => {
    try {
      const response = await fetch(`${API_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          currency,
          balance,
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else {
        fetchAccounts();
        setError("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleEditAccount = async (
    id: number,
    name: string,
    balance: number
  ) => {
    try {
      const response = await fetch(`${API_URL}/accounts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          balance,
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else {
        fetchAccounts();
        setError("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div>{error && <ErrorBanner error={error} setError={setError} />}</div>
      <main className="container">
        <div className="forms-container">
          <AccountForm
            createAccount={handleCreateAccount}
            setError={setError}
          />
          <TransactionForm
            handleSenderChange={handleSenderChange}
            handleReceiverChange={handleReceiverChange}
            handleTransfer={handleTransfer}
            accounts={accounts}
            amount={amount}
            setAmount={setAmount}
            sender={sender}
          />
        </div>
        <AccountsList
          accounts={accounts}
          handleDeleteAccount={handleDeleteAccount}
          handleEditAccount={handleEditAccount}
        />
      </main>
    </>
  );
}

export default App;
