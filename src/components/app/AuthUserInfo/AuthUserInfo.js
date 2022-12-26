import { useDispatch, useSelector } from "react-redux";
import { Avatar, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { authActions } from "store/auth/authSlice";
import HeaderActionButton from "components/ui/Buttons/HeaderActionButton/HeaderActionButton";

const AuthUserInfo = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authStore);

  const onLogOutClickHandler = () => {
    dispatch(authActions.logout());
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar 
        sx={{ backgroundColor: theme.palette.grey[200] }} 
        alt={`${user.last_name}, ${user.first_name}`} 
        src={user.image} 
      />
      <Typography variant="button" display="block" gutterBottom sx={{margin: 0}}>
        {`${user.last_name}, ${user.first_name}`} 
      </Typography>
      {isUpMd && (
        <HeaderActionButton icon={<Logout color="primary"/>} onClickHandler={onLogOutClickHandler} />
      )}
    </Stack>
  )
}

export default AuthUserInfo;