/* eslint-disable react/jsx-key */
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  DateField,
  Button,
  useListController,
} from "react-admin";

const userFilters = [<TextInput source="q" label="Search" alwaysOn />];

export const UserList = (props) => {
  const { selectedIds, data, ...listControllerProps } = useListController(props);

  const handleSendMessage = async () => {
    try {
      const selectedUserIds = selectedIds.map((id) => data[id - 1]?.userId).filter(Boolean);
  
      const response = await fetch("http://localhost:5000/api/sendMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedUserIds }),
      });
      if (response.ok) {
        console.log("Messages sent successfully!");
      } else {
        console.error("Failed to send messages:", await response.text());
      }
    } catch (error) {
      console.error("Error sending messages:", error);
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
          <span><h3>Send message</h3></span>
        </Button>
      </div>
    </>
  );
};
