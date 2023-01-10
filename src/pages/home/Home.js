import { Typography } from '@mui/material';
import HeroHeader from './HeroHeader/HeroHeader';

const Home = () => {

  return (
    <>
      <HeroHeader />
      <Typography sx={{ margin: 0 }} variant='h4'>Home</Typography>
    </>
  );
};

export default Home;