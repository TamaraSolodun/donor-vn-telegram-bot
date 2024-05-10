import { Card, CardHeader } from '@mui/material';

import ErrorAlert from '../components/ErrorAlert';
import useDashboard from '../hooks/useDashboard';
import { Donor } from '../interfaces/Donor';
import textData from '../textData.json';

export default function Dashboard() {
  const { donors, loading, error } = useDashboard();

  return (
    <Card>
      {loading && <h2>{textData.loading}</h2>}
      {error && <ErrorAlert error={error} />}
      <CardHeader title="Вітаємо на сторінці адміністратора" />
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
