import { useState } from "react";
import { Link, Stack } from "@mui/material";
import { Key, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { authFormTypes } from "constants/authConstanst";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

const LoginForm = ({ form, onSubmit, isLoading, setAuthFormType }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const { register, handleSubmit, formState: { errors } } = form;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const onForgotPasswordHandler = (event) => {
    setAuthFormType(authFormTypes.FORGOT_PASSWORD);
  } 

  return(
    <Stack spacing={3}>
      <Typography fontWeight="500" variant="h5">{t("auth.login")}</Typography>
      <Stack spacing={2}>
        <TextField
          id="email"
          name="email"
          error={!!errors.email} 
          {...register('email')}
          required
          label={t("auth.labels.email")}
          size={isDownMd ? "small" : "medium"}
          helperText={!!errors.email?.message && errors.email.message }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="password"
          name="password"
          error={!!errors.password} 
          {...register('password')}
          required
          label={t("auth.labels.password")}
          helperText={!!errors.password?.message && errors.password.message }
          size={isDownMd ? "small" : "medium"}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Link 
          onClick={() => { onForgotPasswordHandler() }}
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            cursor: "pointer"
          }} 
        >
            {t("auth.forgot_password_question")}
        </Link>

        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          sx={{display: "flex", alignSelf: "center"}}
          startIcon={isLoading ? (
            <CircularProgress sx={{ width: '15px !important', height: '15px !important' }} color="inherit" />
          ) : (
            null
          )}
        >{t("auth.labels.submit_login")}</Button>
      </Stack>
    </Stack>
  );
}

export default LoginForm;