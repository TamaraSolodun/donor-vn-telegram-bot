import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getComparator, Order, stableSort } from '../components/EnhancedTable';
import { Donor, DonorList } from '../interfaces/Donor';
import { sendMessages } from '../services/donorsService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getDonorsThunk } from '../store/thunk/donors';

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

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = donors.map((n) => n.userId);
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
    } catch (error) {
      console.error('Error handling send messages:', error);
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
  };
};

export default useDonorsBoard;
