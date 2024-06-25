import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Donor } from '../interfaces/Donor';
import { getSingleDonor, updateDonor } from '../services/donorsService';

import { StyledBox, StyledButton, StyledContainer } from '../styles/App.styled';

export default function UpdateDonor() {
    const { userId } = useParams();
    const [donor, setDonor] = useState<Donor | null>();
    const { t } = useTranslation();
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
                console.error('Error for handling promise:', error),
            );
        }
    }, [userId]);

    return (
        <StyledContainer maxWidth="lg">
            <StyledBox>
                <h1>
                    {t('donor')} {donor?.userId}
                </h1>
                {/* {donor &&
          Object.keys(donor).map((key) => (
            <TextField
              key={key}
              label={key}
              value={donor[key as keyof typeof donor]}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              type='text'
            />
          ))} */}
                <TextField
                    key={donor?.userId}
                    label={donor?.userId}
                    value={donor?.userId}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <TextField
                    key={donor?.bloodType}
                    label={donor?.bloodType}
                    value={donor?.bloodType}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                />
                <TextField
                    key={donor?.firstName}
                    label={donor?.firstName}
                    value={donor?.firstName}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <TextField
                    key={donor?.surname}
                    label={donor?.surname}
                    value={donor?.surname}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <TextField
                    key={donor?.sex}
                    label={donor?.sex}
                    value={donor?.sex}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <TextField
                    key={donor?.dateOfBirth}
                    label={donor?.dateOfBirth}
                    value={donor?.dateOfBirth}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='date'
                />
                <TextField
                    key={donor?.bloodType}
                    label={donor?.bloodType}
                    value={donor?.bloodType}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <TextField
                    key={donor?.rhesusFactor}
                    label={donor?.rhesusFactor}
                    value={donor?.rhesusFactor}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <TextField
                    key={donor?.height}
                    label={donor?.height}
                    value={donor?.height}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='number'
                />
                <TextField
                    key={donor?.weight}
                    label={donor?.weight}
                    value={donor?.weight}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='number'
                />
                <TextField
                    key={donor?.city}
                    label={donor?.city}
                    value={donor?.city}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        readOnly: false,
                    }}
                    type='text'
                />
                <StyledButton
                    onClick={() => {
                        void updateDonor(donor);
                    }}
                >
                    {t('updateDonor')}
                </StyledButton>
            </StyledBox>
        </StyledContainer>
    );
}
