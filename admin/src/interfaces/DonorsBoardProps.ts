import { ListControllerProps } from "react-admin";
import { Donor } from "./Donor";

export interface DonorsBoardProps extends ListControllerProps {
    data: Donor[]; 
    selectedIds: number[];
  }