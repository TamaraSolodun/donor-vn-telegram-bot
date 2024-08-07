import { TextField, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { inviteDonor } from '../services/donorsService';

import { StyledButton, StyledContainer, StyledContainerHeader } from '../styles/App.styled';
import useAlert from '../hooks/useAlert';
import AlertMessage from '../components/AlertMessage';
import Typography from '@mui/material/Typography';

const InviteDonor = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [messageInvite, setMessageInvite] = useState("Реєструйтесь у телеграм боті 'Вінницького центру служби крові' для швидшого отримання повідомлень про потребу донорів! \nПосилання: https://t.me/vn_donor_bot");
    const [messagePreview, setMessagePreview] = useState('');
    const { t } = useTranslation();
    const { message, severity, showAlert, closeAlert } = useAlert();
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleMessageInviteChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessageInvite(event.target.value);
    };

    const handleInviteDonor = async (): Promise<void> => {
        if (window.confirm(t('confirmInviteMessageAlert'))) {
            try {
                await inviteDonor(phoneNumber, messageInvite);
                showAlert(t('successInviteDonor'), 'success');
                setTimeout(() => {
                    navigate('/donors-board');
                }, 5000);
            } catch (error) {
                console.error('Error inviting donor:', error);
                showAlert(t('failedInviteDonor'), 'error');
            }
        }

    };

    useEffect(() => {
        setMessagePreview(
            `\n${messageInvite}
`
        );
    }, [phoneNumber, messageInvite]);

    return (
        <StyledContainer sx={{ width: '50%', mb: 2 }}>
            <StyledContainerHeader>{t('inviteDonor')}</StyledContainerHeader>
            <TextField
                name="phoneNumber"
                label={t('phoneNumber')}
                value={phoneNumber}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                type="text"
            />
            <TextField
                name="messageInvite"
                label={t('messageTextLabel')}
                value={messageInvite}
                onChange={handleMessageInviteChange}
                placeholder="Реєструйтесь у телеграм боті 'Вінницького центру служби крові' для швидшого отримання повідомлень про потребу донорів! \nПосилання: https://t.me/vn_donor_bot"
                fullWidth
                variant="outlined"
                margin="normal"
                type="text"
                multiline
                rows={4}
            />
            <Typography variant="body2" sx={{ marginTop: 2, whiteSpace: 'pre-line', fontSize: '0.875rem' }}>
                {'Повідомлення, що буде надіслано до: '} {phoneNumber} {'\n'}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2, whiteSpace: 'pre-line', fontSize: '0.875rem', color: '#8C271E' }}>
                {messagePreview}
            </Typography>
            <Stack spacing={5} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <StyledButton onClick={handleInviteDonor}>
                    {t('confirmSendMessage')}
                </StyledButton>
            </Stack>
            <AlertMessage
                message={message}
                severity={severity}
                onClose={closeAlert}
            />
        </StyledContainer>
    );
};

export default InviteDonor;
