import { Card, CardHeader } from '@mui/material';

import ErrorAlert from '../components/ErrorAlert';
import useDashboard from '../hooks/useDashboard';
import { Donor } from '../interfaces/Donor';

export default function Dashboard() {
  const { donors, loading, error } = useDashboard();

  return (
    <Card>
      {loading && <h2>Loading...</h2>}
      {error && <ErrorAlert error={error} />}
      <CardHeader title="Welcome to the administration" />
      <div>
        <ul>
          {donors &&
            donors.map((donor: Donor) => (
              <li key={donor.userId}>
                <h3>{donor.username}</h3>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
}
