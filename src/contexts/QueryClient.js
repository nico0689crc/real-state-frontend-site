import { useRef } from "react";
import { QueryClient as QC, QueryClientProvider as QCP } from "react-query";

export const QueryClientProvider = ({ children }) => {
  const queryClientRef = useRef(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QC();
  }

  return <QCP client={queryClientRef.current}>{children}</QCP>;
};
