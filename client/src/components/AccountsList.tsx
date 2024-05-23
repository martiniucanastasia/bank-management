import { useState } from "react";
import { Account } from "../lib/types";

interface AccountsListProps {
  accounts: Account[];
  handleDeleteAccount: (id: number) => Promise<void>;
  handleEditAccount: (
    id: number,
    name: string,
    balance: number
  ) => Promise<void>;
}

export const AccountsList = ({
  accounts,
  handleDeleteAccount,
  handleEditAccount,
}: AccountsListProps) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedBalance, setEditedBalance] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const filteredAccounts = accounts.filter((account) => {
    if (searchValue === "") {
      return true;
    }
    return account.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="accounts-list">
      <h3>Active Accounts</h3>
      <input
        type="text"
        placeholder="Search accounts..."
        maxLength={30}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {filteredAccounts.map((account) => (
        <div className="account-element" key={account.id}>
          {isEditing === account.id ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <input
                type="number"
                value={editedBalance}
                onChange={(e) => setEditedBalance(parseInt(e.target.value))}
              />
              <b>{account.currency}</b>
            </>
          ) : (
            <div>
              {account.name} - {""}
              <b>
                {account.balance.toFixed(1)} <small>{account.currency}</small>
              </b>
            </div>
          )}
          <div className="account-buttons">
            <button
              onClick={() => {
                setIsEditing(account.id);
                setEditedName(account.name);
                setEditedBalance(parseInt(account.balance.toFixed(1)));
                if (isEditing === account.id) {
                  handleEditAccount(account.id, editedName, editedBalance);
                  setIsEditing(null);
                }
              }}
            >
              {isEditing === account.id ? (
                <img
                  src="../../src/assets/save-icon.png"
                  alt="Save"
                  width={18}
                />
              ) : (
                <img
                  src="../../src/assets/edit-icon.png"
                  alt="Edit"
                  width={18}
                />
              )}
            </button>
            <button onClick={() => handleDeleteAccount(account.id)}>
              <img
                src="../../src/assets/delete-icon.png"
                alt="Delete"
                width={18}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
