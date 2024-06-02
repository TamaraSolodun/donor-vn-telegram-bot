import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton } from '../styles/App.styled';

interface SendDialogsProps {
  handleSendMessage: (bloodGroup: string) => Promise<void>;
}
export default function SendDialogs({ handleSendMessage }: SendDialogsProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [bloodGroup, setBloodGroup] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setBloodGroup(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
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
      <Dialog
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
            <FormControl fullWidth>
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
                <MenuItem value={t('APlus')}>{t('APlus')}</MenuItem>
                <MenuItem value={t('AMinus')}>{t('AMinus')}</MenuItem>
                <MenuItem value={t('BPlus')}>{t('BPlus')}</MenuItem>
                <MenuItem value={t('BMinus')}>{t('BMinus')}</MenuItem>
                <MenuItem value={t('ABPlus')}>{t('ABPlus')}</MenuItem>
                <MenuItem value={t('ABMinus')}>{t('ABMinus')}</MenuItem>
                <MenuItem value={t('OPlus')}>{t('OPlus')}</MenuItem>
                <MenuItem value={t('OMinus')}>{t('OMinus')}</MenuItem>
              </Select>
            </FormControl>
            <Typography gutterBottom>{t('messageWait')}</Typography>
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
      </Dialog>
    </>
  );
}
