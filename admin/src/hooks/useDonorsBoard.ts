import { ListControllerProps, useListController } from "react-admin";
import { useAppDispatch } from "../store/store";
import { sendMessages } from "../services/donorsService";

const useDonorsBoard = (props: ListControllerProps) => {
    const dispatch = useAppDispatch();

    const { selectedIds, data, ...listControllerProps } =
      useListController(props);
  
    const handleSendMessage = async () => {
      try {
        const selectedUserIds = selectedIds
          .map((id) => data[id - 1]?.userId)
          .filter(Boolean);
        await dispatch(sendMessages(selectedUserIds));
      } catch (error) {
        console.error("Error handling send messages:", error);
      }
    };
    return {listControllerProps, handleSendMessage}
};

export default useDonorsBoard;
