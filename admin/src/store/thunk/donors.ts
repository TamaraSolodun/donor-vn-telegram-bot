import { createAsyncThunk } from '@reduxjs/toolkit';

import { DonorList } from '../../interfaces/Donor';
import { getDonors } from '../../services/donorsService';

export const getDonorsThunk = createAsyncThunk<DonorList>(
  'donors/addDonor',
  getDonors,
);
