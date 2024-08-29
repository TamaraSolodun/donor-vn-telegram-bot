import React, { useContext } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? element : <Navigate to="/login" replace />;

};

export default PrivateRoute;
