import PropTypes from 'prop-types';

import { AlertMessageProps } from '../interfaces/AlertMessage';

import { StyledAlert, StyledSnackbar } from '../styles/DonorsBoard.styled';

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  severity,
  onClose,
}) => {
  return (
    <StyledSnackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {severity && (
        <StyledAlert onClose={onClose} severity={severity}>
          {message}
        </StyledAlert>
      )}
    </StyledSnackbar>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  onClose: PropTypes.func.isRequired,
};

export default AlertMessage;
