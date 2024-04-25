import { Donor } from "./Donor";

export interface DonorsBoardProps{
    data: Donor[]; 
    selectedIds: number[];
  }