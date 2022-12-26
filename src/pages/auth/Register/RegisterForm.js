import { useState } from "react";
import { Stack } from "@mui/material";
import { Email, Key, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

const RegisterForm = ({ form, onSubmit, isLoading }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const { register, handleSubmit, formState: { errors } } = form;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownPasswordConfirmation = (event) => event.preventDefault();

  return(
    <Stack spacing={3}>
      <Typography fontWeight="500" variant="h5">{t("auth.register")}</Typography>
      <Stack spacing={2}>
        <TextField
          id="first_name"
          name="first_name"
          error={!!errors.first_name} 
          {...register('first_name')}
          required
          label={t("auth.labels.first_name")}
          size={isDownMd ? "small" : "medium"}
          helperText={!!errors.first_name?.message && errors.first_name.message }
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
          id="last_name"
          name="last_name"
          error={!!errors.last_name} 
          {...register('last_name')}
          required
          label={t("auth.labels.last_name")}
          size={isDownMd ? "small" : "medium"}
          helperText={!!errors.last_name?.message && errors.last_name.message }
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
                <Email />
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
        >{t("auth.labels.submit_register")}</Button>
      </Stack>
    </Stack>
  );
}

export default RegisterForm;