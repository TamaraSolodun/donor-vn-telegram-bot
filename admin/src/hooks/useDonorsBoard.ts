import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getComparator, Order, stableSort } from '../components/EnhancedTable';
import { Donor, DonorList } from '../interfaces/Donor';
import { deleteDonor, sendMessages } from '../services/donorsService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getDonorsThunk } from '../store/thunk/donors';

import useAlert from './useAlert';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

  const handleSelectAllClick = (event: any, filteredDonors : DonorList) => {
    if (event.target.checked) {
      const newSelecteds = filteredDonors.map((donor : Donor) => donor.userId);
      setSelected(newSelecteds);
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

  const handleDelete = async (id: number): Promise<void> => {
    try {
        if (window.confirm(t('confirmDeleteAlert'))) {
          await deleteDonor(id);
          showAlert(t('successDeleteDonor'), 'success');
          setTimeout(() => {
            navigate('/donors-board');
          }, 5000);
        }
    } catch (error) {
      console.error('Error deleting donor:', error);
      showAlert(
        (error as Error).message || t('failedDeleteDonor'),
        'error',
      );
    }
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

  const handleSendMessage = async (bloodGroup: string, dateOfNextDonation: string, notes: string): Promise<void> => {
    try {
      await sendMessages(selected, bloodGroup, dateOfNextDonation, notes);
      const selectedDonors = donors.filter(donor => selected.includes(donor.userId));
      const selectedNames = selectedDonors.map(donor => `${donor.firstName} ${donor.surname}`).join(', ');
      showAlert(`${t('successMessageSentToAlert')} ${selectedNames}!`, 'success');

    } catch (error) {
      console.error('Error handling send messages:', error);
      showAlert(
        (error as Error).message || t('failedMessageSentToAlert'),
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
    handleDelete,
    t
  };
};

export default useDonorsBoard;
