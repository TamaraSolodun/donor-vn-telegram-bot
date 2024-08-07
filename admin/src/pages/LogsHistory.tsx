import { CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';

import AlertMessage from '../components/AlertMessage';
import useDashboard from '../hooks/useDashboard';
import Box from '@mui/material/Box';
import { StyledContainer } from '../styles/App.styled';
import LogMessageRow from '../components/LogMessage';


export default function LogsHistory() {
  const { loading, message, severity, closeAlert, logs } = useDashboard();

  const { t } = useTranslation();

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ width: '100%' }}>

        <CardHeader title={t('lastMessages')} />
        
        {loading ? (
            <h2>{t('loading')}</h2>
          ) : (
            <LogMessageRow logs={logs} showDetails={true}/>
          )}
        <AlertMessage
          message={message}
          severity={severity}
          onClose={closeAlert}
        />
      </Box>

    </StyledContainer>
  );
}
