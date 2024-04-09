import { ListControllerProps, useListController } from "react-admin";
import { sendMessages } from "../services/donorsService";
import { Donor } from "../interfaces/Donor";

interface DonorsBoardProps extends ListControllerProps {
  data: Donor[];
  selectedIds: number[];
}
const useDonorsBoard = (props: DonorsBoardProps) => {

  const { selectedIds, data} =
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
  const handleEditDonor = async () => {
    try {
      console.log(window.location.pathname.split("/")[2])
    } catch (error) {
      console.error("Error handling update donor:", error);
    }
  };
  return { handleSendMessage, handleEditDonor }
};

export default useDonorsBoard;
