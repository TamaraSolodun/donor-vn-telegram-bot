import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';

import { styled } from 'styled-components';


export const StyledButtonCard = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #8C271E;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #DE0F0B;
  }
`;

export const StyledContainer = styled(Container)`
  max-width: 90% !important;
  margin: 40px;
  padding: 40px !important;
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
  background-color: #ffff !important;
  color: #8c271e !important;
  outline: none !important;
  border: 1px solid #8c271e !important;
  text-transform: inherit !important;
  font-size: 1em !important;
  padding: 8px !important;
  font-weight: 400 !important;
  &:hover {
    border: 1px solid #8c271e !important;
    color: #ffff !important;
    background-color: #8c271e !important;

  }

  .MuiButton-endIcon {
    margin-right: 0px !important;  
  }
`;

export const StyledGridCard = styled(Card)`
  max-height: 250px !important;
  height: 100% !important;
`;

export const StyledContainerHeader = styled.h2(() => ({
  color: '#8c271e',
  padding: '20px 0',
  textAlign: 'center',
}));

export const StyledButtonSucces = styled(Button)`
  border-radius: 8px !important;
  line-height: 1.3 !important;
  background-color: #ffff !important;
  color: #448A48 !important;
  outline: none !important;
  border: 1px solid #448A48 !important;
  text-transform: inherit !important;
  font-size: 1em !important;
  padding: 8px !important;
  font-weight: 400 !important;
  &:hover {
    border: 1px solid #448A48 !important;
    color: #ffff !important;
    background-color: #448A48 !important;

  }

  .MuiButton-endIcon {
    margin-right: 0px !important;  
  }
`;

export const StyledButtonFailed = styled(Button)`
  border-radius: 8px !important;
  line-height: 1.3 !important;
  background-color: #ffff !important;
  color: #8c271e !important;
  outline: none !important;
  border: 1px solid #8c271e !important;
  text-transform: inherit !important;
  font-size: 1em !important;
  padding: 8px !important;
  font-weight: 400 !important;
  &:hover {
    border: 1px solid #8c271e !important;
    color: #ffff !important;
    background-color: #8c271e !important;

  }

  .MuiButton-endIcon {
    margin-right: 0px !important;  
  }
`;

export const EditButton = styled.button`
  background-color: #D8DDDE;
  color: #8C271E;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8C271E;
    color: #FFFFFF;
  }

  &:disabled {
    background-color: #90a4ae;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;