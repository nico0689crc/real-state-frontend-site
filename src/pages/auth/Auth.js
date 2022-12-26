import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, ButtonGroup, Dialog, DialogContent, useMediaQuery, Stack, useTheme } from "@mui/material";
import { authFormTypes } from "constants/authConstanst";
import { authActions } from "store/auth/authSlice";
import { snackBarAlertActions } from "store/ui/snackBarAlertSlice";
import API_ENDPOINTS from "constants/endpoints";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ForgotPasswordEdit from "./ForgotPasswordEdit/ForgotPasswordEdit";

const Auth = () => {
  const [authFormType, setAuthFormType] = useState(authFormTypes.LOGIN);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const {  ui: { authModalActive }, isAuthenticated } = useSelector(state => state.authStore);

  const isLoginForm = authFormType === authFormTypes.LOGIN;
  const isRegisterForm = authFormType === authFormTypes.REGISTER;
  const isForgotPasswordForm = authFormType === authFormTypes.FORGOT_PASSWORD;
  const isForgotPasswordEditForm = authFormType === authFormTypes.FORGOT_PASSWORD_EDIT;
  
  const toggleeAuthModalHanlder = () => {
    setAuthFormType(authFormTypes.LOGIN);
    dispatch(authActions.toggleAuthModalStatus());
  }

  const toggleAuthFormHandler = (formType) => {
    setAuthFormType(formType);
  }

  useEffect(() => {
    if(searchParams.get('reset_password_period_valid')){
      dispatch(authActions.toggleAuthModalStatus({ authModalActive: false }));
      navigate(API_ENDPOINTS.ROOT);
      dispatch(snackBarAlertActions.setSnackBarAlert({
        snackBarAlert: { type: "error", content: { message: "Invalid Reset Password Token provided." } }
      }));
      return;
    }

    if(location.pathname === API_ENDPOINTS.AUTH) {
      dispatch(authActions.toggleAuthModalStatus({ authModalActive: true }));
    }

    if((location.pathname === API_ENDPOINTS.AUTH_PASSWORD_EDIT) && !isAuthenticated) {
      setAuthFormType(authFormTypes.FORGOT_PASSWORD_EDIT);
      dispatch(authActions.toggleAuthModalStatus({ authModalActive: true }));
    } else {
      dispatch(authActions.toggleAuthModalStatus({ authModalActive: false }));
      navigate(API_ENDPOINTS.ROOT);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Dialog
      open={authModalActive} 
      onClose={toggleeAuthModalHanlder} 
      className="MuiDialogAuthDialog"
      maxWidth="md"
      fullScreen={isDownMd} 
      fullWidth={true}
    >
      <DialogContent>
        <Box className="AuthImageContainer"></Box>
        <Stack padding={4} spacing={5}>
          {(isLoginForm || isRegisterForm) && (
            <ButtonGroup sx={{justifyContent: "flex-end"}} variant="outlined" aria-label="outlined button group">
              <Button 
                variant={isLoginForm ? "contained" : "outlined"}
                onClick={() => toggleAuthFormHandler(authFormTypes.LOGIN)}
              >{t('auth.login')}</Button>
              <Button 
                variant={isRegisterForm ? "contained" : "outlined"}
                onClick={() => toggleAuthFormHandler(authFormTypes.REGISTER)}
              >{t('auth.register')}</Button>
            </ButtonGroup>
          )}

          { isLoginForm && <Login setAuthFormType={setAuthFormType}/> }
          { isRegisterForm && <Register /> }
          { isForgotPasswordForm && <ForgotPassword setAuthFormType={setAuthFormType} /> }
          { isForgotPasswordEditForm && <ForgotPasswordEdit /> }
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;