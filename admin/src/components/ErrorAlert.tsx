import { Alert } from '@mui/material';

function ErrorAlert({ error }: { error: string | undefined }) {
  return <Alert severity="error">{error}</Alert>;
}

export default ErrorAlert;
