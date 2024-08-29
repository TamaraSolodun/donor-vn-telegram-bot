import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import donorImage from '../../../admin/assets/10-removebg-preview.png';
import i18n from '../i18n/i18n';
import { StyledAppBarContainer } from '../styles/Header.styled';
import { AuthContext } from './AuthContext';

const pages = [
  {
    pageName: 'Dashboard',
    pageRoute: 'dashboard',
  },
  {
    pageName: 'Donors',
    pageRoute: 'donors-board',
  },
];

const languages = ['UA', 'EN'];

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const savedLanguage = localStorage.getItem('language') || 'UA';
  const [language, setLanguage] = useState(savedLanguage);

  const [anchorElementNav, setAnchorElementNav] = useState<null | HTMLElement>(null);
  const [anchorElementLanguage, setAnchorElementLanguage] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElementNav(event.currentTarget);
  };

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElementLanguage(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElementNav(null);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElementLanguage(null);
  };

  const handleNavigateToPage = (pageRoute: string) => {
    navigate(`/${pageRoute}`);
    handleCloseNavMenu();
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await i18n.changeLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
    handleCloseLanguageMenu();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    setLanguage(savedLanguage);
  }, [savedLanguage]);

  // If not authenticated, do not render Header
  if (!token) return null;

  return (
    <AppBar position="static">
      <StyledAppBarContainer maxWidth="xl">
        <Toolbar disableGutters>
          <img src={donorImage} width={40} alt="donor-vn-logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElementNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElementNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.pageRoute}
                  onClick={() => handleNavigateToPage(page.pageRoute)}
                >
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.pageRoute}
                onClick={() => handleNavigateToPage(page.pageRoute)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {t(page.pageName)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Change language">
              <Button
                onClick={handleOpenLanguageMenu}
                sx={{ my: 2, color: 'white', display: 'block', p: 0 }}
              >
                {language}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElementLanguage}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElementLanguage)}
              onClose={handleCloseLanguageMenu}
            >
              {languages.map((lan) => (
                <MenuItem
                  key={lan}
                  onClick={() => void handleLanguageChange(lan)}
                >
                  <Typography textAlign="center">{lan}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{ ml: 2, color: 'white' }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </StyledAppBarContainer>
    </AppBar>
  );
}
