import { IconButton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button, CircularProgress, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";

const ForgotPasswordForm = ({ form, onSubmit, isLoading, setAuthFormType }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownPasswordConfirmation = (event) => event.preventDefault();

  const { register, handleSubmit, formState: { errors } } = form;

  return(
    <Stack spacing={3} marginTop={5}>
      <Typography fontWeight="500" variant="h5">{t("auth.forgot_password_edit")}</Typography>
      <Stack spacing={2}>
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
        <TextField
          id="password_confirmation"
          name="password_confirmation"
          error={!!errors.password_confirmation} 
          {...register('password_confirmation')}
          required
          label={t("auth.labels.password_confirmation")}
          helperText={!!errors.password_confirmation?.message && errors.password_confirmation.message }
          size={isDownMd ? "small" : "medium"}
          type={showPasswordConfirmation ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirmation}
                  onMouseDown={handleMouseDownPasswordConfirmation}
                  edge="end"
                >
                  {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
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
        >{t("auth.labels.submit_reset_password")}</Button>
      </Stack>
    </Stack>
  );
}

export default ForgotPasswordForm;