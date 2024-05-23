import { Account } from "../lib/types";

interface TransactionFormProps {
  handleSenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleReceiverChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTransfer: () => Promise<void>;
  accounts: Account[];
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  sender: number | null;
}

export const TransactionForm = ({
  handleSenderChange,
  handleReceiverChange,
  handleTransfer,
  accounts,
  amount,
  setAmount,
  sender,
}: TransactionFormProps) => {
  const receiverOptions = accounts.filter((account) => account.id !== sender);

  return (
    <div className="transaction-form">
      <h3>Make Transaction</h3>
      <div className="transaction-selects">
        <select
          name="sender"
          data-testid="sender-select"
          onChange={handleSenderChange}
        >
          <option>Select Sender</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <img
          width={30}
          src="../src/assets/transaction-icon.png"
          alt="transfer"
        />
        <select
          name="receiver"
          data-testid="receiver-select"
          onChange={handleReceiverChange}
        >
          <option value="">Select Receiver</option>
          {receiverOptions.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="number"
        value={amount}
        placeholder="0"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer Money</button>
    </div>
  );
};
