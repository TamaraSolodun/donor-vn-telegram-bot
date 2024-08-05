import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import '../i18n/i18n';

import AlertMessage from '../components/AlertMessage';
import useDashboard from '../hooks/useDashboard';
import { Donor } from '../interfaces/Donor';
import Box from '@mui/material/Box';
import { StyledContainer, StyledContainerHeader } from '../styles/App.styled';

import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import LogMessage from '../components/LogMessage';

export default function Dashboard() {
  const { donors, loading, message, severity, closeAlert, logs } = useDashboard();
  const { t } = useTranslation();
  
  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ width: '100%' }}>

        {loading && <h2>{t('loading')}</h2>}
        <StyledContainerHeader>{t('welcomeToAdmin')}</StyledContainerHeader>

        <Grid container spacing={4}>

          <Grid item xs={4}>
            <Link to="/donors-board" style={{ textDecoration: 'none' }}>
              <Card style={{ height: '350px' }}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent style={{ height: '100%' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {t('donors')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <div >
                        <ul>
                          {donors &&
                            donors.map((donor: Donor) => (
                              <div key={donor.userId}>
                                <h3>{donor.firstName} {donor.surname}</h3>
                              </div>
                            ))}
                        </ul>
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4}>
            <Link to="/logs" style={{ textDecoration: 'none' }}>
              <Card style={{ height: '350px' }}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent style={{ height: '100%' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {t('lastMessages')}
                    </Typography>
                    <LogMessage logs={logs.slice(0, 2)} showDetails={false} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4}>
            <Link to="/donors-board" style={{ textDecoration: 'none' }}>
              <Card style={{ height: '350px' }}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent style={{ height: '100%' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {t('donors')}
                    </Typography>
                    <div >
                      <ul>
                        {donors &&
                          donors.map((donor: Donor) => (
                            <div key={donor.userId}>
                              <h3>{donor.firstName} {donor.surname}</h3>
                            </div>
                          ))}
                      </ul>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>



        </Grid>

        <AlertMessage
          message={message}
          severity={severity}
          onClose={closeAlert}
        />
      </Box>

    </StyledContainer>
  );
}


заголовок - запросити донорів 
кнопка - надіслати (головна)
confirm (точно ? )
login - http use
повідомлення - динамічне 
автоматична генерація повідомлення

2 інпута - 3 інпут на основі перших вдох з редагуванням

3 поле примітка:
4 поле рідонлі що буде надіслано