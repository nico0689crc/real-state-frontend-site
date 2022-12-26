import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordEditMutation } from "hooks/queries/auth/authQueries";
import { authActions } from "store/auth/authSlice";
import ForgotPasswordEditForm from "./ForgotPasswordEditForm";
import { useSearchParams } from "react-router-dom";

const getFormSchema = (t) => {
  const formSchema = yup.object().shape({
    "password": yup.string().required(t("global.validations.required")),
    "password_confirmation": yup.string().required(t("global.validations.required"))
  });

  const defaultValues = {
    "password": "AAEERRaaa!@2022",
    "password_confirmation": "AAEERRaaa!@2022"
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const ForgotPasswordEdit = (props) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const form = useForm(getFormSchema(t));

  const onSuccessHandler = (response) => {
    const { data, headers } = response;

    dispatch(authActions.login({
      auth: {
        accessToken: headers['access-token'],
        uid: headers['uid'],
        client: headers['client'],
        tokenExpirationDate: headers['expiry'],
        user: data
      }
    }));
  }

  const onErrorHandler = ({ response }) => {
    if(response.status === 422) {
      const { errors } = response.data;
      Object.keys(errors).forEach(key => {
        if(key !== "full_messages") {
          const message = errors["full_messages"].find(message => message.includes(errors[key][0]));
          form.setError(key, {message: message});
        }
      });
    }
  }

  const { mutate, isLoading } = useResetPasswordEditMutation(
    onSuccessHandler, 
    onErrorHandler, {
      uid: searchParams.get('uid'),
      "access-token": searchParams.get('access-token'),
      client: searchParams.get('client'),
  });

  const onSubmit = async (data) => mutate(data);

  return(
    <ForgotPasswordEditForm 
      {...props} 
      form={form} 
      onSubmit={onSubmit} 
      isLoading={isLoading}
    />
  );
}

export default ForgotPasswordEdit;