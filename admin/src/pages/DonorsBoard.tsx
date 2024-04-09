import {
  List,
  Datagrid,
  TextField,
  TextInput,
  DateField,
  Button,
  useGetList,
} from "react-admin";
import useDonorsBoard from "../hooks/useDonorsBoard";
import { DonorsBoardProps } from "../interfaces/DonorsBoardProps";

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn key="search" />,
];

export const DonorsBoard = (props: DonorsBoardProps) => {
  const { handleSendMessage } = useDonorsBoard(props);
  const { data } = useGetList("donors");


  return (
    <>
      {/* {loading && <h2>Loading...</h2>}
      {error && <ErrorAlert error={error} />} */}
      <List filters={userFilters} resource="donors">
        <Datagrid data={data} rowClick="edit">
          <TextField source="userId" />
          <TextField source="username" data-testid="username" />
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
        <Button onClick={handleSendMessage} data-testid="sendButton">
          <span>Send message</span>
        </Button>
      </div>
    </>
  );
};
