import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "hooks/queries/auth/authQueries";
import { authActions } from "store/auth/authSlice";
import LoginForm from "./LoginForm";

const getFormSchema = (t) => {
  const formSchema = yup.object().shape({
    "email": yup.string().required(t("global.validations.required")),
    "password": yup.string().required(t("global.validations.required"))
  });

  const defaultValues = {
    "email": "",
    "password": ""
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const Login = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const form = useForm(getFormSchema(t));

  const onSuccessHandler = (response) => {
    const { data: {data}, headers } = response;

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
    if(response.status === 401) {
      form.setError("email", {message: response.data.errors[0]});
      form.setError("password", {message: response.data.errors[0]});
    }
  }

  const { mutate, isLoading } = useLoginMutation(onSuccessHandler, onErrorHandler);

  const onSubmit = async (data) => mutate(data);

  return(
    <LoginForm 
      {...props} 
      form={form} 
      onSubmit={onSubmit} 
      isLoading={isLoading}
    />
  );
}

export default Login;