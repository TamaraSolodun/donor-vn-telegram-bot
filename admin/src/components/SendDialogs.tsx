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

import { textData } from '../i18n/TextData';

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
        {t(textData.ua.sendMessage)}
      </StyledButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {t(textData.ua.sendMessage)}
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
            <Typography gutterBottom>{t(textData.ua.dialogMessage)}</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t(textData.ua.bloodGroupLabel)}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bloodGroup}
                label="BloodGroup"
                onChange={handleChange}
              >
                <MenuItem value={t(textData.ua.APlus)}>
                  {t(textData.ua.APlus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.AMinus)}>
                  {t(textData.ua.AMinus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.BPlus)}>
                  {t(textData.ua.BPlus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.BMinus)}>
                  {t(textData.ua.BMinus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.ABPlus)}>
                  {t(textData.ua.ABPlus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.ABMinus)}>
                  {t(textData.ua.ABMinus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.OPlus)}>
                  {t(textData.ua.OPlus)}
                </MenuItem>
                <MenuItem value={t(textData.ua.OMinus)}>
                  {t(textData.ua.OMinus)}
                </MenuItem>
              </Select>
            </FormControl>
            <Typography gutterBottom>{t(textData.ua.messageWait)}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={() => {
              void handleSendMessage(bloodGroup);
            }}
          >
            {t(textData.ua.confirmSendMessage)}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
