import { createAsyncThunk } from "@reduxjs/toolkit";
import { DonorList, Donor } from "../../interfaces/Donor";
import { getDonors, getSingleDonor } from "../../services/donorsService";

export const getDonorsThunk = createAsyncThunk<DonorList>(
  "donors/addDonor",
  getDonors
);
export const getSingleDonorThunk = createAsyncThunk<Donor, number>(
  "donors/getSingleDonor",
  getSingleDonor
);