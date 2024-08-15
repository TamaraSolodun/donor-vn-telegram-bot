import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import i18n from './i18n/i18n';
import Dashboard from './pages/Dashboard';
import DonorsBoard from './pages/DonorsBoard';
import { store } from './store/store';

import { StyledWrapper } from './styles/App.styled';
import UpdateDonor from './pages/UpdateDonor';
import LogsHistory from './pages/LogsHistory';
import InviteDonor from './pages/InviteDonor';

export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Header />
        <StyledWrapper>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donors-board" element={<DonorsBoard />} />
            <Route path="/donors-board/:userId" element={<UpdateDonor />} />
            <Route path="/logs" element={<LogsHistory />} />
            <Route path="/invite-donor" element={<InviteDonor />} />
          </Routes>
        </StyledWrapper>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
);


/* TO DO: 15 minutes ago on main*/
/* TO DO: 15 minutes ago on LogMessage on hover - full*/
/* TO DO: Auth*/
/* TO DO: Update donor form - group inputs*/
