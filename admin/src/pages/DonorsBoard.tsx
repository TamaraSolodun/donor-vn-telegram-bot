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
import { DonorsBoardProps } from "../interfaces/DonorsBoardProps";

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn key="search" />,
];

export const DonorsBoard = (props: DonorsBoardProps) => {
  const { handleSendMessage } = useDonorsBoard(props);

  return (
    <>
      {/* {loading && <h2>Loading...</h2>}
      {error && <ErrorAlert error={error} />} */}
      <List filters={userFilters} resource="donors">
        <Datagrid rowClick="edit" >
          <TextField source="username" data-testid="username"/>
          <TextField source="firstName" />
          <TextField source="surname" />
          <TextField source="bloodType" />
          <TextField source="rhesusFactor" />
          <DateField source="dateOfBirth" />
          <TextField source="sex" />
          <TextField source="height" />
          <TextField source="weight" />
          <TextField source="city" />
        </Datagrid>
      </List>
      <div>
        <Button onClick={handleSendMessage} data-testid="sendButton" disabled>
          <span>
            Send message
          </span>
        </Button>
      </div>
    </>
  );
};


