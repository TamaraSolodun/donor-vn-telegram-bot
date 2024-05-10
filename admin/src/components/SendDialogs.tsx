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

import textData from '../textData.json';

import { StyledButton } from '../styles/App.styled';

interface SendDialogsProps {
  handleSendMessage: (bloodGroup: string) => void;
}
export default function SendDialogs({ handleSendMessage }: SendDialogsProps) {
  const [open, setOpen] = useState(false);

  const [bloodGroup, setBloodGroup] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setBloodGroup(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    // setTimeout(() => {
    //     setOpen(false);
    // }, 5000)
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
        {textData.sendMessage}
      </StyledButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {textData.sendMessage}
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
            <Typography gutterBottom>{textData.dialogMessage}</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {textData.bloodGroupLabel}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bloodGroup}
                label="BloodGroup"
                onChange={handleChange}
              >
                <MenuItem value={textData.APlus}>{textData.APlus}</MenuItem>
                <MenuItem value={textData.AMinus}>{textData.AMinus}</MenuItem>
                <MenuItem value={textData.BPlus}>{textData.BPlus}</MenuItem>
                <MenuItem value={textData.BMinus}>{textData.BMinus}</MenuItem>
                <MenuItem value={textData.ABPlus}>{textData.ABPlus}</MenuItem>
                <MenuItem value={textData.ABMinus}>{textData.ABMinus}</MenuItem>
                <MenuItem value={textData.OPlus}>{textData.OPlus}</MenuItem>
                <MenuItem value={textData.OMinus}>{textData.OMinus}</MenuItem>
              </Select>
            </FormControl>
            <Typography gutterBottom>{textData.messageWait}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={() => handleSendMessage(bloodGroup)}>
            {textData.confirmSendMessage}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
