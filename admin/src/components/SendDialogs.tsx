import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton, StyledDialog, StyledFormControl } from '../styles/App.styled';

interface SendDialogsProps {
  handleSendMessage: (bloodGroup: string, dateOfNextDonation: string) => Promise<void>;
}

export default function SendDialogs({ handleSendMessage }: SendDialogsProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [bloodGroup, setBloodGroup] = useState('');
  const [dateOfNextDonation, setDateOfNextDonation] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setBloodGroup(event.target.value as string);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfNextDonation(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
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
          <Box sx={{ minWidth: 400 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StyledFormControl sx={{ width: '100%', marginRight: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  {t('bloodGroupLabel')}
                </InputLabel>
                <Select
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
                </Select>
                <TextField
                  name="dateOfNextDonation"
                  label=""
                  value={dateOfNextDonation}
                  onChange={handleDateChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: false,
                  }}
                  type='date'
                />
              </StyledFormControl>
            </Box>

          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={() => {
              void handleSendMessage(bloodGroup, dateOfNextDonation);
              handleClose();
            }}
          >
            {t('confirmSendMessage')}
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
}
