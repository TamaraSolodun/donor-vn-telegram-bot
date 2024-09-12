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
import { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton, StyledDialog, StyledFormControl } from '../styles/App.styled';
import Typography from '@mui/material/Typography';

interface SendDialogsProps {
  handleSendMessage: (bloodGroup: string, dateOfNextDonation: string, notes: string) => Promise<void>;
}

export default function SendDialogs({ handleSendMessage }: SendDialogsProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [bloodGroup, setBloodGroup] = useState('');
  const [dateOfNextDonation, setDateOfNextDonation] = useState('');
  const [notes, setNotes] = useState('');
  const [messagePreview, setMessagePreview] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setBloodGroup(event.target.value as string);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfNextDonation(event.target.value);
  };

  const handleNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  useEffect(() => {
    setMessagePreview(
      `\n'Вінницький обласний центр служби крові' потребує донора крові: ${bloodGroup}
      Очікувати Вас: ${dateOfNextDonation} ?
      Примітка: ${notes};`
    );
  }, [bloodGroup, dateOfNextDonation, notes]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendClick = () => {
    if (window.confirm(t('confirmSendMessageAlert'))) {
      void handleSendMessage(bloodGroup, dateOfNextDonation, notes);
    }
  };

  return (
    <>
      <StyledButton
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<SendIcon />}
      >
        {t('inviteDonorsMessageTitle')}
      </StyledButton>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {t('inviteDonorsMessageTitle')}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StyledFormControl sx={{ width: '100%', marginBottom: 2 }}>
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
                  <MenuItem value="A+, A-, B+, B-, AB+, AB-, O+, O-">{t('allTypes')}</MenuItem>
                </Select>
              </StyledFormControl>
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
              <TextField
                name="notes"
                label="Примітка:"
                value={notes}
                onChange={handleNotesChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: false,
                }}
              />

              <Typography variant="body2" sx={{ marginTop: 2, whiteSpace: 'pre-line', fontSize: '0.875rem' }}>
                {'Повідомлення, що буде надіслано:\n'} 
                {messagePreview}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleSendClick}>
            {t('confirmSendMessage')}
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
}
