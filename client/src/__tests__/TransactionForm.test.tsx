import { render, fireEvent } from "@testing-library/react";
import { TransactionForm } from "../components/TransactionForm";
import { Account } from "../lib/types";

describe("TransactionForm", () => {
  it("should render account list component", () => {
    const handleSenderChange = jest.fn();
    const handleReceiverChange = jest.fn();
    const handleTransfer = jest.fn();
    const setAmount = jest.fn();
    const { getByText } = render(
      <TransactionForm
        handleSenderChange={handleSenderChange}
        handleReceiverChange={handleReceiverChange}
        handleTransfer={handleTransfer}
        accounts={[]}
        amount={""}
        setAmount={setAmount}
        sender={1}
      />
    );
    expect(getByText(/Make Transaction/)).toBeVisible();
  });

  it("should exclude sender from receiver options", () => {
    const handleSenderChange = jest.fn();
    const handleReceiverChange = jest.fn();
    const handleTransfer = jest.fn();
    const setAmount = jest.fn();
    const accounts: Account[] = [
      { id: 1, name: "Account 1", currency: "USD", balance: 100 },
      { id: 2, name: "Account 2", currency: "USD", balance: 150 },
    ];
    const { getByTestId } = render(
      <TransactionForm
        handleSenderChange={handleSenderChange}
        handleReceiverChange={handleReceiverChange}
        handleTransfer={handleTransfer}
        accounts={accounts}
        amount="50"
        setAmount={setAmount}
        sender={1}
      />
    );
    const receiverSelect = getByTestId("receiver-select");
    expect(receiverSelect).not.toHaveTextContent("Account 1");
    expect(receiverSelect).toHaveTextContent("Account 2");
  });

  // Rejects non-numeric characters
  it("should reject non-numeric characters when inputting amount", () => {
    const handleSenderChange = jest.fn();
    const handleReceiverChange = jest.fn();
    const handleTransfer = jest.fn();
    const setAmount = jest.fn();
    const { getByPlaceholderText } = render(
      <TransactionForm
        handleSenderChange={handleSenderChange}
        handleReceiverChange={handleReceiverChange}
        handleTransfer={handleTransfer}
        accounts={[]}
        amount=""
        setAmount={setAmount}
        sender={null}
      />
    );
    const amountInput = getByPlaceholderText("0");
    fireEvent.change(amountInput, { target: { value: "abc" } });
    expect(setAmount).not.toHaveBeenCalledWith("abc");
  });
});
