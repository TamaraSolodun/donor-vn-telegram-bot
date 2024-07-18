
import { LogMessageList } from '../interfaces/LogMessage';
import { sendMessages } from '../services/donorsService';
import { StyledButton } from '../styles/App.styled';
import { StyledAlert } from '../styles/DonorsBoard.styled';
import { useTranslation } from 'react-i18next';

export default function LogMessage({ logs, showDetails }: { logs: LogMessageList; showDetails: boolean }) {
  const { t } = useTranslation();

  return (
    <div>
      {logs && logs.map((log, index) => (
        <StyledAlert key={index} severity={log.success ? 'success' : 'error'} style={{ position: 'relative'}}>
          <div style={{ "padding": "0 0 7px 0" }}><b>{t('logMessageSent')}</b>{log.message}</div>

          {showDetails &&
            <div>
              <div style={{ "padding": "7px 0" }}><b>{t('logMessageSentTo')}</b>{log.firstName} {log.surname}</div>
              <div style={{ "padding": "7px 0" }}><b>{t('logMessageTimeStamp')}</b>{new Date(log.timestamp).toLocaleString()}</div>
            </div>

          }
          {showDetails && !log.success && <StyledButton style={{ position: 'absolute', top: '10px', right: '12px' }}
            onClick={async () => {
              log.messageType == "willDonate" ?
                await sendMessages([Number(log.userId)], log.messageProps.bloodGroup, log.messageProps.dateOfNextDonation) :
                console.log("confirmDonate is not realised")
            }}
          >
            {t('resendMessage')}
          </StyledButton>}

        </StyledAlert>
      ))}
    </div>
  );
}
