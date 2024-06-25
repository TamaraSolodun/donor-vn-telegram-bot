import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton, StyledDialog, StyledFormControl, StyledSelect } from '../styles/App.styled';

interface SendDialogsProps {
  handleSendMessage: (bloodGroup: string) => Promise<void>;
}
export default function SendDialogs({ handleSendMessage }: SendDialogsProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [bloodGroup, setBloodGroup] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setBloodGroup(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
    // setTimeout(() => {
    //   setOpen(false);
    // }, 5000);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledButton
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<SendIcon />}
      >
        {t('sendMessage')}
      </StyledButton>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {t('sendMessage')}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ minWidth: 120 }}>
            <Typography gutterBottom>{t('dialogMessage')}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StyledFormControl sx={{ width: '25%', marginRight: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  {t('bloodGroupLabel')}
                </InputLabel>
                <StyledSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bloodGroup}
                  label="BloodGroup"
                  onChange={handleChange}
                >
                  <MenuItem value="A+">{t('APlus')}</MenuItem>
                  <MenuItem value="A-">{t('AMinus')}</MenuItem>
                  <MenuItem value="B+">{t('BPlus')}</MenuItem>
                  <MenuItem value="B-">{t('BMinus')}</MenuItem>
                  <MenuItem value="AB+">{t('ABPlus')}</MenuItem>
                  <MenuItem value="AB-">{t('ABMinus')}</MenuItem>
                  <MenuItem value="O+">{t('OPlus')}</MenuItem>
                  <MenuItem value="O-">{t('OMinus')}</MenuItem>
                </StyledSelect>
              </StyledFormControl>
              <Typography gutterBottom>{t('messageWait')}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={() => {
              void handleSendMessage(bloodGroup);
            }}
          >
            {t('confirmSendMessage')}
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
}
