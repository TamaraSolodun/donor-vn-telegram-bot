import { Card, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../i18n/i18n';

import AlertMessage from '../components/AlertMessage';
import useDashboard from '../hooks/useDashboard';
import { Donor } from '../interfaces/Donor';

export default function Dashboard() {
  const { donors, loading, message, severity, closeAlert } = useDashboard();
  const { t } = useTranslation();

  return (
    <Card>
      {loading && <h2>{t('loading')}</h2>}
      <CardHeader title={t('welcomeToAdmin')} />
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

      <AlertMessage
        message={message}
        severity={severity}
        onClose={closeAlert}
      />
    </Card>
  );
}
