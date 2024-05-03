import { useEffect, useState } from 'react';

import { DonorList } from '../interfaces/Donor';
import { donorsSelector } from '../store/donor/DonorSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getDonorsThunk } from '../store/thunk/donors';

const useDashboard = () => {
  const dispatch = useAppDispatch();

  const [donors, setDonors] = useState<DonorList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const selectedDonors = useAppSelector(donorsSelector);

  useEffect(() => {
    void dispatch(getDonorsThunk());
  }, [dispatch]);

  useEffect(() => {
    setLoading(selectedDonors.loading);
    setError(selectedDonors.error);
    setDonors(selectedDonors.donors);
  }, [selectedDonors]);

  return { donors, loading, error };
};

export default useDashboard;
