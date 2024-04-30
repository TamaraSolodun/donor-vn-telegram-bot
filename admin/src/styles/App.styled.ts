import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import styled from 'styled-components';

export const StyledContainer = styled(Container)`
  max-width: 1000px;
  margin: 40px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 24px;
`;
export const StyledDialog = styled(Dialog)`
  margin: 40px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 24px;
`;

export const StyledBox = styled(Box)`
  min-width: 120px;
`;

export const StyledWrapper = styled.div`
  padding: 20px;
  background-color: #d8ddde;
  min-height: 100vh;
`;

export const StyledButton = styled(Button)`
  border-radius: 12px !important;
  background-color: #aba194 !important;
  color: black !important;
  outline: none !important;
  borded: 0px !important;
`;
