import { render, fireEvent, waitFor } from "@testing-library/react";
import { AccountForm } from "../components/AccountForm";

describe("AccountForm", () => {
  it("should create an account successfully when all fields are valid", async () => {
    const mockCreateAccount = jest.fn().mockResolvedValue(undefined);
    const mockSetError = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <AccountForm createAccount={mockCreateAccount} setError={mockSetError} />
    );
    fireEvent.change(getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByPlaceholderText("0"), { target: { value: "100" } });
    fireEvent.click(getByRole("button", { name: /Create Account/i }));
    await waitFor(() =>
      expect(mockCreateAccount).toHaveBeenCalledWith("John Doe", "USD", 100)
    );
    expect(mockSetError).toHaveBeenCalledWith("");
  });

  it("should set an error when any field is empty", async () => {
    const mockCreateAccount = jest.fn().mockResolvedValue(undefined);
    const mockSetError = jest.fn();
    const { getByRole } = render(
      <AccountForm createAccount={mockCreateAccount} setError={mockSetError} />
    );
    fireEvent.click(getByRole("button", { name: /Create Account/i }));
    expect(mockSetError).toHaveBeenCalledWith("Please fill out all fields.");
  });
});
