import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import '../i18n/i18n';

import AlertMessage from '../components/AlertMessage';
import useDashboard from '../hooks/useDashboard';
import { Donor } from '../interfaces/Donor';
import Box from '@mui/material/Box';
import { StyledButtonCard, StyledContainer, StyledContainerHeader } from '../styles/App.styled';

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
              <Card style={{ height: '350px', position: 'relative' }}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent style={{ height: '100%' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {t('donors')}
                    </Typography>
                    <div>
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
                  <StyledButtonCard>
                    <ArrowForwardIcon />
                  </StyledButtonCard>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4}>
            <Link to="/logs" style={{ textDecoration: 'none' }}>
              <Card style={{ height: '350px', position: 'relative' }}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent style={{ height: '100%' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {t('lastMessages')}
                    </Typography>
                    <LogMessage logs={logs.slice(0, 2)} showDetails={false} />
                  </CardContent>
                  <StyledButtonCard>
                    <ArrowForwardIcon />
                  </StyledButtonCard>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>


          <Grid item xs={4}>
            <Link to="/invite-donor" style={{ textDecoration: 'none' }}>
              <Card style={{ height: '350px', position: 'relative' }}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent style={{ height: '100%' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {t('inviteDonor')}
                    </Typography>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                      <TextField
                        variant="outlined"
                        label="Phone Number"
                        placeholder="+380XXXXXXXXX"
                        value="+380XXXXXXXXX"
                        style={{ width: '100%', maxWidth: '300px' }}
                        disabled={true}
                      />
                    </div>
                  </CardContent>
                  <StyledButtonCard>
                    <ArrowForwardIcon />
                  </StyledButtonCard>
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