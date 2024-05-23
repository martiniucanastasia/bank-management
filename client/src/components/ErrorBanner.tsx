export const ErrorBanner = ({
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="error-wrapper">
      <div className="error-banner-close" onClick={() => setError("")}>
        &times;
      </div>
      <div className="error-banner">{error.toString()}</div>
    </div>
  );
};
