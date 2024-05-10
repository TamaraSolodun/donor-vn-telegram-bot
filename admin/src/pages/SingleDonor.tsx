import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Donor } from '../interfaces/Donor';
import { getSingleDonor } from '../services/donorsService';
import textData from '../textData.json';

import { StyledBox, StyledContainer } from '../styles/App.styled';

export default function SingleDonor() {
  const { userId } = useParams();
  const [donor, setDonor] = useState<Donor | undefined>();

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
          {textData.donor} {donor?.userId}
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
