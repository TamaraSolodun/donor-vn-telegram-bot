import {
  List,
  Datagrid,
  TextField,
  TextInput,
  DateField,
  Button,
} from "react-admin";
import useDonorsBoard from "../hooks/useDonorsBoard";
import { DonorsBoardProps } from "../interfaces/DonorsBoardProps";

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn key="search" />,
];

export const DonorsBoard = (props: DonorsBoardProps) => {
  const {listControllerProps, handleSendMessage} = useDonorsBoard(props);

  return (
    <>
      {/* {loading && <h2>Loading...</h2>}
      {error && <ErrorAlert error={error} />} */}
      <List filters={userFilters} {...listControllerProps}>
        <Datagrid rowClick="edit">
          <TextField source="username" />
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
        <Button onClick={handleSendMessage}>
          <span>
            <h3>Send message</h3>
          </span>
        </Button>
      </div>
    </>
  );
};
