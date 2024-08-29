import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import i18n from './i18n/i18n';
import Dashboard from './pages/Dashboard';
import DonorsBoard from './pages/DonorsBoard';
import { store } from './store/store';
import { AuthProvider, AuthContext } from "./components/AuthContext";

import { StyledWrapper } from './styles/App.styled';
import UpdateDonor from './pages/UpdateDonor';
import LogsHistory from './pages/LogsHistory';
import InviteDonor from './pages/InviteDonor';
import Registration from './components/Registration';

import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <AuthContext.Consumer>
                {({ token }) => ( //refresh token
                  <>
                    {token && <Header />}
                    <StyledWrapper>
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                        <Route path="/donors-board" element={<PrivateRoute element={<DonorsBoard />} />} />
                        <Route path="/donors-board/:userId" element={<PrivateRoute element={<UpdateDonor />} />} />
                        <Route path="/logs" element={<PrivateRoute element={<LogsHistory />} />} />
                        <Route path="/invite-donor" element={<PrivateRoute element={<InviteDonor />} />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                      </Routes>
                    </StyledWrapper>
                  </>
                )}
              </AuthContext.Consumer>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
