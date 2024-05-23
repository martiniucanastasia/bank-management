import { render } from "@testing-library/react";
import { ErrorBanner } from "../components/ErrorBanner";

describe("ErrorBanner", () => {
  it("should show error message when it is passed", () => {
    const setError = jest.fn();
    const { getByText } = render(
      <ErrorBanner error={"This is mock error"} setError={setError} />
    );
    expect(getByText(/This is mock error/)).toBeVisible();
  });
});
