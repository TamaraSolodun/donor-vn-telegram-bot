import { ListControllerProps, useListController } from "react-admin";
import { sendMessages } from "../services/donorsService";

const useDonorsBoard = (props: ListControllerProps) => {

    const { selectedIds, data, ...listControllerProps } =
      useListController(props);
  
    const handleSendMessage = async () => {
      try {
        const selectedUserIds = selectedIds
          .map((id) => data[id - 1]?.userId)
        sendMessages(selectedUserIds);
      } catch (error) {
        console.error("Error handling send messages:", error);
      }
    };
    return {listControllerProps, handleSendMessage}
};

export default useDonorsBoard;
