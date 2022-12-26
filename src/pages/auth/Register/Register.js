import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "hooks/queries/auth/authQueries";
import { authActions } from "store/auth/authSlice";
import RegisterForm from "./RegisterForm";

const getFormSchema = (t) => {
  const formSchema = yup.object().shape({
    "first_name": yup.string().required(t("global.validations.required")),
    "last_name": yup.string().required(t("global.validations.required")),
    "email": yup.string().required(t("global.validations.required")),
    "password": yup.string().required(t("global.validations.required")),
    "password_confirmation": yup.string().required(t("global.validations.required"))
  });

  const defaultValues = {
    "first_name": "Vicolas",
    "last_name": "Vernandez",
    "email": "nico.06.89crc+1@gmail.com",
    "password": "AAEERRaaa!@2022",
    "password_confirmation": "AAEERRaaa!@2022",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const Register = () => {
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

  const { mutate, isLoading } = useRegisterMutation(onSuccessHandler, onErrorHandler);

  const onSubmit = async (data) => mutate(data);

  return(
    <RegisterForm 
      form={form} 
      onSubmit={onSubmit} 
      isLoading={isLoading} 
    />
  );
}

export default Register;