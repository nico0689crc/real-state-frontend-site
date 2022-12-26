import {useSelector, useDispatch} from "react-redux";
import { Stack, Snackbar, Alert, Typography } from "@mui/material";
import { snackBarAlertActions } from "store/ui/snackBarAlertSlice";

const AppSnackBar = ({className, children, ...props}) => {
  const dispatch = useDispatch();
  const { 
    isSnackBarOpen, 
    snackBarAlert: {
      anchorOrigin, 
      content: {
        title, 
        subTitle, 
        message 
      }, 
      type
    } 
  } = useSelector(state => state.snackBarAlertStore);

  const toggleSnackBarAlertHandler = () => {
    dispatch(snackBarAlertActions.closeSnackBarAlert());
  }

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={isSnackBarOpen} 
      autoHideDuration={6000} 
      onClose={toggleSnackBarAlertHandler}
      sx={{ width: {xs: '100%', lg: "25%"} }}
      {...props} 
    >
      <Alert onClose={toggleSnackBarAlertHandler} severity={type}>
        <Stack spacing={1}>
          {title && <Typography variant="subtitle1">{title}</Typography>}
          {subTitle && <Typography variant="body2">{subTitle}</Typography>}
          {message && <Typography variant="body2">{message}</Typography>}
        </Stack>
      </Alert>
    </Snackbar>
  ); 
}

export default AppSnackBar;