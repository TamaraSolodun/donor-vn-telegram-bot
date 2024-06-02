import { useCallback, useState } from 'react';

import { AlertState, Severity } from '../interfaces/AlertMessage';

const useAlert = (): AlertState => {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<Severity | undefined>();

  const showAlert = useCallback((message: string, severity: Severity) => {
    setMessage(message);
    setSeverity(severity);
  }, []);

  const closeAlert = useCallback(() => {
    setMessage(null);
    setSeverity(undefined);
  }, []);

  return { message, severity, showAlert, closeAlert };
};

export default useAlert;
