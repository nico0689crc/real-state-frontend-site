import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "hooks/queries/auth/authQueries";
import { snackBarAlertActions } from "store/ui/snackBarAlertSlice";
import { authActions } from "store/auth/authSlice";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { authFormTypes } from "constants/authConstanst";

const getFormSchema = (t) => {
  const formSchema = yup.object().shape({
    "email": yup.string().required(t("global.validations.required"))
  });

  const defaultValues = {
    "email": ""
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const form = useForm(getFormSchema(t));

  const onSuccessHandler = (response) => {
    props.setAuthFormType(authFormTypes.LOGIN);
    dispatch(authActions.toggleAuthModalStatus({authModalActive: false}));
    dispatch(snackBarAlertActions.setSnackBarAlert({
      snackBarAlert: {
        type: "success",
        content: {
          title: null,
          subTitle: null, 
          message: response.message 
        },
        anchorOrigin: {
          vertical: "bottom", 
          horizontal: "right"
        }
      }
    }));
  }

  const onErrorHandler = ({ response }) => {
    if(response.status === 404) {
      const { errors } = response.data;
      form.setError("email", {message: errors[0]});
    }
  }

  const { mutate, isLoading } = useResetPasswordMutation(onSuccessHandler, onErrorHandler);

  const onSubmit = async (data) => mutate({
    ...data,
    redirect_url: `${process.env.REACT_APP_FRONTEND_URL}auth/password/edit`
  });

  return(
    <ForgotPasswordForm 
      {...props} 
      form={form} 
      onSubmit={onSubmit} 
      isLoading={isLoading}
    />
  );
}

export default ForgotPassword;