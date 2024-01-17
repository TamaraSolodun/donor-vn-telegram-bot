import { Card, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/donors")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setDonors(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <div>
        <ul>
          {donors &&
            donors.map((donor) => (
              <li key={donor._id}>
                <h3>{donor.username}</h3>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
};
