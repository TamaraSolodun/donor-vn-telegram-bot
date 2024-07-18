import { TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Donor } from '../interfaces/Donor';
import { getSingleDonor, updateDonor } from '../services/donorsService';

import { StyledBox, StyledButton, StyledContainer, StyledContainerHeader } from '../styles/App.styled';
import useAlert from '../hooks/useAlert';
import AlertMessage from '../components/AlertMessage';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';


export default function UpdateDonor() {
    const { userId } = useParams();
    const [donor, setDonor] = useState<Donor | null>(null);
    const { t } = useTranslation();
    const { message, severity, showAlert, closeAlert } = useAlert();
    const bloodTypes = ['A', 'B', 'AB', 'O'];
    const rhesusFactors = ['+', '-'];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const fetchedDonor: Donor = await getSingleDonor(Number(userId));
                setDonor(fetchedDonor);
            } catch (error) {
                console.error('Error fetching donor:', error);
            }
        };
        if (!Number.isNaN(Number(userId))) {
            fetchDonor().catch((error) =>
                console.error('Error handling promise:', error),
            );
        }
    }, [userId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDonor((prevDonor) => (prevDonor ? { ...prevDonor, [name]: value } : null));
    };
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setDonor((prevDonor) => (prevDonor ? { ...prevDonor, [name!]: value } : null));
    };

    const handleUpdateDonor = async (): Promise<void> => {
        try {
            if (donor) {
                await updateDonor(donor);
                showAlert('Donor updated successfully', 'success');
                setTimeout(() => {
                    navigate('/donors-board');
                }, 5000);
            }
        } catch (error) {
            console.error('Error updating donor:', error);
            showAlert(
                (error as Error).message || 'Error updating donor.',
                'error',
            );
        }
    };

    return (
        <StyledContainer sx={{ width: '60%', mb: 2 }}>

                    <StyledContainerHeader >
                        {t('donor')} {donor?.userId}
                    </StyledContainerHeader>
                    <TextField
                        name="userId"
                        label={t('userId')}
                        value={donor?.userId || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        type='text'
                    />
                    <TextField
                        name="firstName"
                        label={t('firstName')}
                        value={donor?.firstName || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='text'
                    />
                    <TextField
                        name="surname"
                        label={t('surname')}
                        value={donor?.surname || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='text'
                    />
                    <TextField
                        name="phoneNumber"
                        label={t('phoneNumber')}
                        value={donor?.phoneNumber || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='text'
                    />
                    <TextField
                        name="sex"
                        label={t('sex')}
                        value={donor?.sex || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='text'
                    />
                    <TextField
                        name="dateOfBirth"
                        label={t('dateOfBirth')}
                        value={donor?.dateOfBirth || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='date'
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>{t('bloodType')}</InputLabel>
                        <Select
                            name="bloodType"
                            value={donor?.bloodType || ''}
                            onChange={handleSelectChange}
                            label={t('bloodType')}
                        >
                            {bloodTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>{t('rhesusFactor')}</InputLabel>
                        <Select
                            name="rhesusFactor"
                            value={donor?.rhesusFactor || ''}
                            onChange={handleSelectChange}
                            label={t('rhesusFactor')}
                        >
                            {rhesusFactors.map((factor) => (
                                <MenuItem key={factor} value={factor}>
                                    {factor}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        name="dateOfLastDonation"
                        label={t('dateOfLastDonation')}
                        value={donor?.dateOfLastDonation || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='date'
                    />
                    <TextField
                        name="countOfDonations"
                        label={t('countOfDonations')}
                        value={donor?.countOfDonations || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='number'
                    />
                    <TextField
                        name="dateOfNextDonation"
                        label={t('dateOfNextDonation')}
                        value={donor?.dateOfNextDonation || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='date'
                    />
                    <TextField
                        name="height"
                        label={t('height')}
                        value={donor?.height || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='number'
                    />
                    <TextField
                        name="weight"
                        label={t('weight')}
                        value={donor?.weight || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='number'
                    />
                    <TextField
                        name="city"
                        label={t('city')}
                        value={donor?.city || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: false,
                        }}
                        type='text'
                    />

                <Stack spacing={5} direction="row" justifyContent="flex-end" sx={{mt: 3 }}>
                    <StyledButton onClick={handleUpdateDonor}>
                        {t('updateDonor')}
                    </StyledButton>
                </Stack>
                <AlertMessage
                    message={message}
                    severity={severity}
                    onClose={closeAlert}
                />
        </StyledContainer>
    );
}
