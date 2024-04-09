import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  Input,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { donorsSelector } from "../store/donor/DonorSlice";
import { useEffect, useState } from "react";
import { getSingleDonorThunk } from "../store/thunk/donors";
import { Donor } from "../interfaces/Donor";

export default function SingleDonor(props: unknown) {
  console.log(props)
  const userId = Number(window.location.pathname.split("/")[2]);
  const [donor, setDonor] = useState<Donor>();

  const dispatch = useAppDispatch();
  const selectedDonors = useAppSelector(donorsSelector);
  useEffect(() => {
    dispatch(getSingleDonorThunk(userId));
  }, [dispatch]);

  useEffect(() => {
    setDonor(selectedDonors?.singleDonor);
  }, [selectedDonors]);
  return (
    <div>
      <h1>Donor Details {donor?.userId}</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">{donor?.dateOfBirth}</InputLabel>
          <Input aria-describedby="my-helper-text" defaultValue={donor?.surname}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">{donor?.firstName}</InputLabel>
          <Input aria-describedby="my-helper-text" defaultValue={donor?.surname}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">{donor?.surname}</InputLabel>
          <Input aria-describedby="my-helper-text" defaultValue={donor?.surname}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">{donor?.phoneNumber}</InputLabel>
          <Input aria-describedby="my-helper-text" defaultValue={donor?.surname}/>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
