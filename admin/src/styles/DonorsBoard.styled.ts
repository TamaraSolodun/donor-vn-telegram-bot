import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { styled } from 'styled-components';

export const StyledBox = styled(Box)`
  min-width: 120px;
`;

export const StyledWrapper = styled.div`
  padding: 20px;
  background-color: #d8ddde;
  min-height: 100vh;
`;
export const StyledSnackbar = styled(Snackbar)({
  width: '400px',
});

export const StyledAlert = styled(Alert)({
  fontSize: '1.25rem',
  width: '100%',
});
