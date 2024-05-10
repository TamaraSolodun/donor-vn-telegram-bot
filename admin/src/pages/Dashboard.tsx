import { Card, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../i18n/i18n';

import ErrorAlert from '../components/ErrorAlert';
import useDashboard from '../hooks/useDashboard';
import { textData } from '../i18n/TextData';
import { Donor } from '../interfaces/Donor';

import { StyledButton } from '../styles/App.styled';

export default function Dashboard() {
  const { donors, loading, error } = useDashboard();
  const { t, i18n } = useTranslation();
  const changeLanguageHandler = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };
  return (
    <Card>
      {loading && <h2>{t(textData.ua.loading)}</h2>}
      {error && <ErrorAlert error={error} />}
      <CardHeader title="Вітаємо на сторінці адміністратора" />
      <h2>{t(textData.ua.loading)}</h2>
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
      <StyledButton onClick={() => void changeLanguageHandler('en')}>
        TRANSLATE
      </StyledButton>
    </Card>
  );
}
