export const Error = ({ children, hasError }) => {
  return (
    <p className={`mt-2 text-sm text-red-600 ${hasError ? 'visible' : 'invisible'}`}>
      {children}
    </p>
  );
};
