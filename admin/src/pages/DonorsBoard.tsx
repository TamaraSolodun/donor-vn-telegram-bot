import { EnhancedTableToolbar, EnhancedTableHead } from "../components/EnhancedTable";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import useDonorsBoard from "../hooks/useDonorsBoard";
import SendDialogs from "../components/SendDialogs";

export default function DonorsBoard() {

  const { handleClick, handleSendMessage, dense, order, orderBy, donors, selected, handleSelectAllClick, isSelected, emptyRows, visibleRows } = useDonorsBoard();
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
              onRequestSort={{}}
              rowCount={donors.length}
            />
            <TableBody>
              {visibleRows.map((donor, index) => {
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
      </Paper>
 
      <Stack spacing={5} direction="row">
        <SendDialogs handleSendMessage={handleSendMessage} />
      </Stack>

    </Box>
  );
};


