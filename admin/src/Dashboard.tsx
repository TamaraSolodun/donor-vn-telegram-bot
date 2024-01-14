import { Card, CardContent, CardHeader } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donors")
      .then((response) => setDonors(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>Lorem ipsum sic dolor amet...</CardContent>
      <div>
        <h1>Items</h1>
        <ul>
          {donors && donors.map((donor) => (
            <li key={donor._id}>
              <h3>{donor.username}</h3>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
