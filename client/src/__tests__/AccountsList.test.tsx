import { render, fireEvent } from "@testing-library/react";
import { AccountsList } from "../components/AccountsList";
import { Account } from "../lib/types";

describe("AccountsList", () => {
  it("should render account list component", () => {
    const handleDeleteAccount = jest.fn();
    const handleEditAccount = jest.fn();
    const { getByText } = render(
      <AccountsList
        accounts={[]}
        handleDeleteAccount={handleDeleteAccount}
        handleEditAccount={handleEditAccount}
      />
    );
    expect(getByText(/Active Accounts/)).toBeVisible();
  });
  
  it("should display all accounts when search input is empty", () => {
    const accounts: Account[] = [
      { id: 1, name: "User A", balance: 100, currency: "USD" },
      { id: 2, name: "User B", balance: 200, currency: "EUR" },
    ];
    const handleDeleteAccount = jest.fn();
    const handleEditAccount = jest.fn();
    const { getByPlaceholderText, getAllByText } = render(
      <AccountsList
        accounts={accounts}
        handleDeleteAccount={handleDeleteAccount}
        handleEditAccount={handleEditAccount}
      />
    );
    fireEvent.change(getByPlaceholderText("Search accounts..."), {
      target: { value: "" },
    });
    expect(getAllByText(/User/).length).toBe(2);
  });
});
