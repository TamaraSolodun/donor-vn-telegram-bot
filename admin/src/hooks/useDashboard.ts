import { useEffect, useState } from 'react';

import { DonorList } from '../interfaces/Donor';
import { donorsSelector } from '../store/donor/DonorSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getDonorsThunk } from '../store/thunk/donors';

import useAlert from './useAlert';
import { getLogs } from '../services/donorsService';
import { LogMessage, LogMessageList } from '../interfaces/LogMessage';

const useDashboard = () => {
  const dispatch = useAppDispatch();

  const [donors, setDonors] = useState<DonorList>([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [language, setLanguage] = useState<string | undefined>();

  const selectedDonors = useAppSelector(donorsSelector);
  const { message, severity, showAlert, closeAlert } = useAlert();
  
  const fetchLogs = async () => {
    try {
      const fetchedLogs = await getLogs();
      setLogs(fetchedLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    void dispatch(getDonorsThunk());
    fetchLogs()
  }, [dispatch]);

  useEffect(() => {
    setLoading(selectedDonors.loading);
    setError(selectedDonors.error);
    setDonors(selectedDonors.donors);
    setLanguage(selectedDonors.language);
    if (selectedDonors.error) {
      showAlert(selectedDonors.error, 'error');
    }
  }, [selectedDonors, showAlert]);

  return {
    donors,
    loading,
    error,
    language,
    message,
    severity,
    showAlert,
    closeAlert,
    logs,
  };
};

export default useDashboard;
