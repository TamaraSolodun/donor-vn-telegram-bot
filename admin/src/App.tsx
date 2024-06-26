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
          </Routes>
        </StyledWrapper>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
);
/* TO DO: tests on bot */
/* TO DO: login */
/* TO DO: fix inputs types  */
/* TO DO: update donor */
/* TO DO: delete donor idDeleted in db */
/* TO DO: styles */
