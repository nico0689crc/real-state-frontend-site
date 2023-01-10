import { Outlet } from 'react-router-dom';
import AppSuspense from 'components/core/AppSuspense';
import { Stack } from '@mui/material';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Auth from 'pages/auth/Auth';

const MainLayout = () => {
  return (
    <Stack marginTop={{xs: 2, md: 4}}>
      <Header />
      <Navbar />
      <AppSuspense>
        <Outlet />
      </AppSuspense>
      <Footer />
      <Auth />
    </Stack>
  );
}

export default MainLayout;
