import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  }, [setToken, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
