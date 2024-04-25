import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { StyledBox, StyledButton, StyledDialog } from '../styles/App.styled';
import Dialog from '@mui/material/Dialog';


interface SendDialogsProps {
    handleSendMessage: (bloodGroup: string) => Promise<void>
}
export default function SendDialogs({ handleSendMessage }: SendDialogsProps) {
    const [open, setOpen] = useState(false);

    const [bloodGroup, setBloodGroup] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setBloodGroup(event.target.value as string);
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
            <StyledButton variant="outlined" onClick={handleClickOpen} endIcon={<SendIcon />}>
                Send Message
            </StyledButton>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Send Message
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
                        <Typography gutterBottom>
                            'Вінницький обласний центр служби крові' потребує донора крові:  </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bloodGroup}
                                label="BloodGroup"
                                onChange={handleChange}
                            >
                                <MenuItem value={'A+'}>A+</MenuItem>
                                <MenuItem value={"A-"}>A-</MenuItem>
                                <MenuItem value={"B+"}>B+</MenuItem>
                                <MenuItem value={"B-"}>B-</MenuItem>
                                <MenuItem value={"AB+"}>AB+</MenuItem>
                                <MenuItem value={"AB-"}>AB-</MenuItem>
                                <MenuItem value={"O+"}>O+</MenuItem>
                                <MenuItem value={")-"}>O-</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography gutterBottom>Очікуємо Вас!</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <StyledButton autoFocus onClick={() => handleSendMessage(bloodGroup)}>
                        Confirm sending
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </>
    );
}