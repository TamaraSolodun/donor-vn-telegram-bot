import { Card, CardHeader } from "@mui/material";
import useDashboard from "../hooks/useDashboard";
import { Donor } from "../interfaces/Donor";

export const Dashboard = () => {
  const { donors } = useDashboard();

  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <div>
        <ul>
          {donors &&
            donors.map((donor : Donor) => (
              <li key={donor.userId}>
                <h3>{donor.username}</h3>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
};
