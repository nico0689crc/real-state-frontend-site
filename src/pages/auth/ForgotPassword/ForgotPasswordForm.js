import { Link, Stack } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Button, CircularProgress, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

const authFormTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD"
}

const ForgotPasswordForm = ({ form, onSubmit, isLoading, setAuthFormType }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const { register, handleSubmit, formState: { errors } } = form;

  const onExisingAcoountClickHandler = (event) => {
    setAuthFormType(authFormTypes.LOGIN);
  } 

  return(
    <Stack spacing={3} marginTop={5}>
      <Typography fontWeight="500" variant="h5">{t("auth.forgot_password")}</Typography>
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

        <Link 
          onClick={() => { onExisingAcoountClickHandler() }}
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            cursor: "pointer"
          }} 
        >
            {t("auth.use_existing_account")}
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
        >{t("auth.labels.submit_reset_password")}</Button>
      </Stack>
    </Stack>
  );
}

export default ForgotPasswordForm;