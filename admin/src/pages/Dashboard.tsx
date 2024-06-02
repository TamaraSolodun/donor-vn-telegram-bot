import { Card, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../i18n/i18n';

import ErrorAlert from '../components/ErrorAlert';
import useDashboard from '../hooks/useDashboard';
import { Donor } from '../interfaces/Donor';
import { changeLanguageHandler } from '../services/donorsService';

import { StyledButton } from '../styles/App.styled';

export default function Dashboard() {
  const { donors, loading, error, language } = useDashboard();
  const { t } = useTranslation();

  return (
    <Card>
      {loading && <h2>{t('loading')}</h2>}
      {error && <ErrorAlert error={error} />}
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
      <StyledButton onClick={() => void changeLanguageHandler(language)}>
        TRANSLATE
      </StyledButton>
    </Card>
  );
}
