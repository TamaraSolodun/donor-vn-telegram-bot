import {
  List,
  Datagrid,
  TextField,
  TextInput,
  DateField,
  Button,
  useListController,
  ListControllerProps,
} from "react-admin";
import { sendMessage } from "../services/donorsService";

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn key="search" />,
];

export const DonorsBoard = (props: ListControllerProps) => {
  const { selectedIds, data, ...listControllerProps } =
    useListController(props);

  const handleSendMessage = async () => {
    try {
      const selectedUserIds = selectedIds
        .map((id) => data[id - 1]?.userId)
        .filter(Boolean);
      await sendMessage(selectedUserIds);
    } catch (error) {
      console.error("Error handling send messages:", error);
    }
  };

  return (
    <>
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
