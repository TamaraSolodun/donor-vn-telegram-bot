import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';


import AlertMessage from '../components/AlertMessage';
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
} from '../components/EnhancedTable';
import SendDialogs from '../components/SendDialogs';
import useDonorsBoard from '../hooks/useDonorsBoard';

import { EditButton, StyledContainer } from '../styles/App.styled';
import { useState } from 'react';

export default function DonorsBoard() {
  const {
    handleClick,
    handleSendMessage,
    dense,
    order,
    orderBy,
    donors,
    selected,
    handleSelectAllClick,
    handleRequestSort,
    isSelected,
    emptyRows,
    visibleRows,
    handleEdit,
    message,
    severity,
    closeAlert,
    isDisabledCheckbox,
    handleDelete,
    t
  } = useDonorsBoard();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredDonors = donors.filter(donor =>
    Object.values(donor).some(value =>
      value !== null && value !== undefined && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ width: '100%' }}>

        <EnhancedTableToolbar numSelected={selected.length} />
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: '100%'
          }}
        >
          <TextField
            label={t('Search')}
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              maxWidth: { lg: '30%' },
              width: '100%' 
            }}
          />
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event) => handleSelectAllClick(event, filteredDonors)}
              onRequestSort={handleRequestSort}
              rowCount={filteredDonors.length}
              hasDisabledRows={filteredDonors.some(donor => isDisabledCheckbox(donor.dateOfLastDonation, donor.countOfDonations))}
            />
            <TableBody>
              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor, index) => {
                  const isItemSelected = isSelected(donor.userId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const disabled = isDisabledCheckbox(donor.dateOfLastDonation, donor.countOfDonations);

                  return (
                    <Tooltip
                      title={disabled ? t('donationNotRecommendedTooltip') : ''}
                      placement="top"
                      arrow
                      key={donor.userId}
                    >
                      <TableRow
                        hover={!disabled}
                        onClick={disabled ? undefined : (event) => handleClick(event, donor.userId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={donor.userId}
                        selected={isItemSelected}
                        sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            disabled={disabled}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="donor" padding="none">
                          {donor.userId}
                        </TableCell>
                        <TableCell align="left">{donor.firstName}</TableCell>
                        <TableCell align="left">{donor.surname}</TableCell>
                        <TableCell align="left">{donor.sex}</TableCell>
                        <TableCell align="left">{donor.dateOfLastDonation}</TableCell>
                        <TableCell align="left">{donor.countOfDonations}</TableCell>
                        <TableCell align="left">{donor.bloodType}</TableCell>
                        <TableCell align="left">{donor.rhesusFactor}</TableCell>
                        <TableCell align="left">{donor.dateOfNextDonation}</TableCell>
                        <TableCell align="left">{donor.willDonate === 'yes' ? 'Yes' : donor.willDonate === 'no' ? 'No' : ''}</TableCell>
                        <TableCell align="left">{donor.height}</TableCell>
                        <TableCell align="left">{donor.weight}</TableCell>
                        <TableCell align="left">{donor.city}</TableCell>
                        <TableCell align="left">
                          <EditButton
                            aria-label="Edit"
                            onClick={() => handleEdit(donor.userId)}
                            disabled={false}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </EditButton>
                        </TableCell>
                        <TableCell align="left">
                          <EditButton
                            aria-label="Delete"
                            onClick={() => handleDelete(donor.userId)}
                            disabled={false}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </EditButton>
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    {t('noResults')}
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={13} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={5} direction="row" justifyContent="flex-end" marginTop={5} marginBottom={2}>
          <SendDialogs handleSendMessage={handleSendMessage} />
        </Stack>

        <AlertMessage
          message={message}
          severity={severity}
          onClose={closeAlert}
        />
      </Box>
    </StyledContainer>
  );
}
