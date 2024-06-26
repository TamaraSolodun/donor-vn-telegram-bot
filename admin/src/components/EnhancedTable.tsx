import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { ChangeEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Donor } from '../interfaces/Donor';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export type Comparator<Key extends keyof unknown> = (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number;

export function getComparator<Key extends keyof unknown>(
  order: Order,
  orderBy: Key,
): Comparator<Key> {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map(
    (element, index) => [element, index] as [T, number],
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((element) => element[0]);
}

export interface HeadCell {
  id: keyof Donor;
  label: string;
  numeric: boolean;
}
export const headCells: readonly HeadCell[] = [
  {
    id: 'userId',
    numeric: true,
    label: 'id',
  },
  {
    id: 'firstName',
    numeric: false,
    label: 'firstName',
  },
  {
    id: 'surname',
    numeric: false,
    label: 'surname',
  },
  {
    id: 'sex',
    numeric: false,
    label: 'sex',
  },
  {
    id: 'dateOfLastDonation',
    numeric: false,
    label: 'dateOfLastDonation',
  },
  {
    id: 'countOfDonations',
    numeric: true,
    label: 'countOfDonations',
  },
  {
    id: 'bloodType',
    numeric: false,
    label: 'bloodType',
  },
  {
    id: 'rhesusFactor',
    numeric: false,
    label: 'rhesusFactor',
  },
  {
    id: 'height',
    numeric: true,
    label: 'height',
  },
  {
    id: 'weight',
    numeric: true,
    label: 'weight',
  },
  {
    id: 'city',
    numeric: false,
    label: 'city',
  },
];

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Donor) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Donor) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox"></TableCell>
      </TableRow>
    </TableHead>
  );
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { t } = useTranslation();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {t('selected')}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {t('donors')}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
