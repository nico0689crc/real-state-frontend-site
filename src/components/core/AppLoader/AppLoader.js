import { Box, Stack } from "@mui/material";
import loader from "assets/images/loader.gif";

const AppLoader = () => {
  return (
    <Stack sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ height: '150px' }}>
        <img src={loader} alt="Sheltos" height="100%"/>
      </Box>
    </Stack>
  );
}

export default AppLoader;