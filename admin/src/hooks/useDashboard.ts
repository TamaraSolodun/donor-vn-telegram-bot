import { useState, useEffect } from "react";
import { getDonors } from "../services/donorsService";
import { DonorList } from "../interfaces/Donor";
import { useAppDispatch, useAppSelector } from "../store/store";
import { donorsSelector } from "../store/donor/DonorSlice";

const useDashboard = () => {
  const dispatch = useAppDispatch();

  const [donors, setDonors] = useState<DonorList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const selectedDonors = useAppSelector(donorsSelector);

  useEffect(() => {
    dispatch(getDonors());
  }, [dispatch]);

  useEffect(() => {
    setLoading(selectedDonors.loading);
    setError(selectedDonors.error);
    setDonors(selectedDonors.donors);
  }, [selectedDonors]);

  return { donors, loading, error };
};

export default useDashboard;
