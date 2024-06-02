export type Severity = 'error' | 'warning' | 'info' | 'success';

export interface AlertState {
  message: string | null;
  severity: Severity | undefined;
  showAlert: (message: string, severity: Severity) => void;
  closeAlert: () => void;
}

export interface AlertMessageProps {
  message: string | null;
  severity: Severity | undefined;
  onClose: () => void;
}
