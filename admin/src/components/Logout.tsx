import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  }, [setAccessToken, setRefreshToken, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
