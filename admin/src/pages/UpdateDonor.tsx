import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Donor } from '../interfaces/Donor';
import { getSingleDonor, updateDonor } from '../services/donorsService';

import { StyledBox, StyledButton, StyledContainer } from '../styles/App.styled';
import useAlert from '../hooks/useAlert';
import AlertMessage from '../components/AlertMessage';

export default function UpdateDonor() {
    const { userId } = useParams();
    const [donor, setDonor] = useState<Donor | null>(null);
    const { t } = useTranslation();
    const { message, severity, showAlert, closeAlert } = useAlert();


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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDonor((prevDonor) => (prevDonor ? { ...prevDonor, [name]: value } : null));
    };
    
    const handleUpdateDonor = async (): Promise<void> => {
        try {
            if (donor) {
                await updateDonor(donor);
                showAlert('Donor updated successfully', 'success');
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
        <StyledContainer maxWidth="lg">
            <StyledBox>
                <h1>
                    {t('donor')} {donor?.userId}
                </h1>
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
                <TextField
                    name="bloodType"
                    label={t('bloodType')}
                    value={donor?.bloodType || ''}
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
                    name="rhesusFactor"
                    label={t('rhesusFactor')}
                    value={donor?.rhesusFactor || ''}
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
                 <StyledButton onClick={handleUpdateDonor}>
                    {t('updateDonor')}
                </StyledButton>
                <AlertMessage
                    message={message}
                    severity={severity}
                    onClose={closeAlert}
                />
            </StyledBox>
        </StyledContainer>
    );
}
