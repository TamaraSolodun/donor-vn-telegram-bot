import { useState, useEffect } from "react";
import { getDonors } from "../services/donorsService";
import { DonorList } from "../interfaces/Donor";

const useDashboard = () => {
  const [donors, setDonors] = useState<DonorList>([]);
  //Toasts for errors? 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonors();
        setDonors(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { donors };
};

export default useDashboard;
