import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getComparator, Order, stableSort } from '../components/EnhancedTable';
import { Donor, DonorList } from '../interfaces/Donor';
import { sendMessages } from '../services/donorsService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getDonorsThunk } from '../store/thunk/donors';

import useAlert from './useAlert';

const useDonorsBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Donor>('userId');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(false);
  const [rowsPerPage] = useState(5);

  const donorsData = useAppSelector((state) => state.donors.donors);
  const [donors, setDonors] = useState<DonorList>([]);

  const { message, severity, showAlert, closeAlert } = useAlert();

  useEffect(() => {
    void dispatch(getDonorsThunk());
  }, [dispatch]);

  useEffect(() => {
    setDonors(donorsData);
  }, [donorsData]);

  useEffect(() => {
    console.log('Donors Data:', donorsData);
  }, [donorsData]);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Donor,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const isDisabledCheckbox = (dateOfLastDonation: string | null, countOfDonations: number | null) => {
    if (!dateOfLastDonation) return false;
    const lastDonationDate = new Date(dateOfLastDonation);
    const currentDate = new Date();
    const differenceInDays = (currentDate.getTime() - lastDonationDate.getTime()) / (1000 * 3600 * 24);
    return differenceInDays < 60 || (countOfDonations ?? 0) > 6;;
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = donors
        .filter(donor => !isDisabledCheckbox(donor.dateOfLastDonation, donor.countOfDonations))
        .map(donor => donor.userId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    switch (selectedIndex) {
      case -1: {
        newSelected = [...newSelected, ...selected, id];
        break;
      }
      case 0: {
        newSelected = [...newSelected, ...selected.slice(1)];
        break;
      }
      case selected.length - 1: {
        newSelected = [...newSelected, ...selected.slice(0, -1)];
        break;
      }
      default: {
        if (selectedIndex > 0) {
          newSelected = [
            ...newSelected,
            ...selected.slice(0, selectedIndex),
            ...selected.slice(selectedIndex + 1),
          ];
        }
      }
    }
    setSelected(newSelected);
  };
  const handleEdit = (id: number) => {
    navigate(`/donors-board/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: number) => selected.includes(id);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - donors.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(donors, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, donors],
  );

  const handleSendMessage = async (bloodGroup: string): Promise<void> => {
    try {
      await sendMessages(selected, bloodGroup);
      const selectedDonors = donors.filter(donor => selected.includes(donor.userId));
      const selectedNames = selectedDonors.map(donor => `${donor.firstName} ${donor.surname}`).join(', ');
      showAlert(`Messages sent successfully to: ${selectedNames}!`, 'success');

    } catch (error) {
      console.error('Error handling send messages:', error);
      showAlert(
        (error as Error).message || 'Failed to send messages.',
        'error',
      );
    }
  };

  return {
    handleClick,
    dense,
    order,
    orderBy,
    donors,
    selected,
    handleRequestSort,
    handleSelectAllClick,
    handleChangePage,
    isSelected,
    emptyRows,
    visibleRows,
    handleSendMessage,
    handleEdit,
    message,
    severity,
    closeAlert,
    isDisabledCheckbox,
  };
};

export default useDonorsBoard;
