import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styled } from 'styled-components';

export const StyledContainer = styled(Container)`
  max-width: 90% !important;
  margin: 40px;
  padding: 20px !important;
  background-color: #ffff;
  border-radius: 24px;
`;
export const StyledDialog = styled(Dialog)`
  '& .MuiPaper-root': {
    borderRadius: '15px',
  },
`;

export const StyledFormControl = styled(FormControl)`
  border-radius: 7px !important;
  margin-right: 10px !important;
`;

export const StyledSelect = styled(Select)`
  & .MuiSelect-select {

  }
  & .MuiOutlinedInput-notchedOutline {
    border-radius: 7px !important;

  }
  &:hover .MuiOutlinedInput-notchedOutline {
  }
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
  border-radius: 8px !important;
  line-height: 1.3 !important;
  background-color: #aba194 !important;
  color: black !important;
  outline: none !important;
  border: 0px !important;
  text-transform: inherit !important;
  font-size: 1em !important;
  padding: 8px !important;
  font-weight: 400 !important;
  &:hover {
    border: 0px !important;
  }

  .MuiButton-endIcon {
    margin-right: 0px !important;  
  }
`;