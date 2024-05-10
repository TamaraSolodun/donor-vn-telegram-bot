import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { textData } from '../i18n/TextData';
import { Donor } from '../interfaces/Donor';
import { getSingleDonor } from '../services/donorsService';

import { StyledBox, StyledContainer } from '../styles/App.styled';

export default function SingleDonor() {
  const { userId } = useParams();
  const [donor, setDonor] = useState<Donor | undefined>();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        console.log(typeof userId);
        const fetchedDonor: Donor = await getSingleDonor(Number(userId));
        setDonor(fetchedDonor);
        console.log(fetchedDonor);
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
          {t(textData.ua.donor)} {donor?.userId}
        </h1>
        {donor &&
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
            />
          ))}
      </StyledBox>
    </StyledContainer>
  );
}
