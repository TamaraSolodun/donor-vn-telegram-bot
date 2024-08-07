
import { LogMessage, LogMessageList } from '../interfaces/LogMessage';
import { confirmDonation, inviteDonor, sendMessages } from '../services/donorsService';
import { StyledButtonFailed, StyledButtonSucces } from '../styles/App.styled';
import { StyledAlert } from '../styles/DonorsBoard.styled';
import { useTranslation } from 'react-i18next';
import AlertMessage from './AlertMessage';
import useAlert from '../hooks/useAlert';

export default function LogMessageRow({ logs, showDetails }: { logs: LogMessageList; showDetails: boolean }) {
  const { t } = useTranslation();
  const { message, severity, showAlert, closeAlert } = useAlert();


  const handleResendType = async (log: LogMessage) => {
    try {
      if (window.confirm(t('resendMessageConfirm'))) {
        switch (log.messageType) {
          case 'confirmDonate':
            await confirmDonation(Number(log.userId), log.messageProps.dateOfNextDonation);
            break;
          case 'willDonate':
            await sendMessages([Number(log.userId)], log.messageProps.bloodGroup, log.messageProps.dateOfNextDonation, log.messageProps.notes)
            break;
          case 'inviteDonor':
            await inviteDonor(log.messageProps.phoneNumber, log.message)
            break;
        }
        showAlert(t('successSent'), 'success');
      }
    } catch (error) {
      showAlert(t('failedSent'), 'error');
    }

  };

  return (
    <div>
      {logs && logs.map((log, index) => (
        <StyledAlert key={index} severity={log.success ? 'success' : 'error'} style={{ position: 'relative' }}>
          <div style={{ width: '85%' }}>
            <div style={{ "padding": "0 0 7px 0" }}><b>{t('logMessageSent')}</b>{log.message}</div>

            {showDetails &&
              <div>
                <div style={{ "padding": "7px 0" }}><b>{t('logMessageSentTo')}</b>{log.firstName} {log.surname}</div>
                <div style={{ "padding": "7px 0" }}><b>{t('logMessageTimeStamp')}</b>{new Date(log.timestamp).toLocaleString()}</div>
              </div>

            }
            {showDetails && log.success && <StyledButtonSucces style={{ position: 'absolute', top: '10px', right: '12px' }}
              onClick={() => handleResendType(log)}
            >
              {t('resendMessage')}
            </StyledButtonSucces>}

            {showDetails && !log.success && <StyledButtonFailed style={{ position: 'absolute', top: '10px', right: '12px' }}
              onClick={() => handleResendType(log)}
            >
              {t('resendMessage')}
            </StyledButtonFailed>}
          </div>
        </StyledAlert>
      ))}
      <AlertMessage
        message={message}
        severity={severity}
        onClose={closeAlert}
      />
    </div>
  );
}
