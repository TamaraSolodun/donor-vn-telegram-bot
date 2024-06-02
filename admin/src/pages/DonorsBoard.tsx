import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import AlertMessage from '../components/AlertMessage';
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
} from '../components/EnhancedTable';
import SendDialogs from '../components/SendDialogs';
import useDonorsBoard from '../hooks/useDonorsBoard';

import { StyledContainer } from '../styles/App.styled';

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
  } = useDonorsBoard();
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%' }}>
        <StyledContainer sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
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
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={donors.length}
              />
              <TableBody>
                {visibleRows &&
                  visibleRows.map((donor, index) => {
                    const isItemSelected = isSelected(donor.userId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, donor.userId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={donor.userId}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="donor"
                          padding="none"
                        >
                          {donor.userId}
                        </TableCell>
                        <TableCell align="left">{donor.firstName}</TableCell>
                        <TableCell align="left">{donor.surname}</TableCell>
                        <TableCell align="left">{donor.sex}</TableCell>
                        <TableCell align="left">{donor.height}</TableCell>
                        <TableCell align="left">{donor.weight}</TableCell>
                        <TableCell align="left">{donor.bloodType}</TableCell>
                        <TableCell align="left">{donor.rhesusFactor}</TableCell>
                        <TableCell align="left">{donor.city}</TableCell>
                        <TableCell align="left">
                          <button
                            aria-label="Example"
                            onClick={() => handleEdit(donor.userId)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledContainer>

        <Stack spacing={5} direction="row">
          <SendDialogs handleSendMessage={handleSendMessage} />
        </Stack>

        <AlertMessage
          message={message}
          severity={severity}
          onClose={closeAlert}
        />
      </Box>
    </Container>
  );
}
