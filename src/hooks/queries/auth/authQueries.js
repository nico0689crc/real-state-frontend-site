import { useMutation, useQuery } from "react-query";
import { QueryService, PATH_TYPES } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";
import getUserData from "lib/getUserData";

export const useLoginMutation = (onSuccessHandler, onErrorHandler) => {
  const loginQueryServices = new QueryService(API_ENDPOINTS.LOGIN, PATH_TYPES.ROOT);

  return useMutation(input => loginQueryServices.login(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useRegisterMutation = (onSuccessHandler, onErrorHandler) => {
  const registerQueryServices = new QueryService(API_ENDPOINTS.REGISTER, PATH_TYPES.ROOT);

  return useMutation(input => registerQueryServices.post(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useResetPasswordMutation = (onSuccessHandler, onErrorHandler) => {
  const resetPasswordQueryServices = new QueryService(API_ENDPOINTS.RESET_PASSWORD, PATH_TYPES.ROOT);

  return useMutation(input => resetPasswordQueryServices.resetPassword(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useResetPasswordEditMutation = (onSuccessHandler, onErrorHandler, headers) => {
  const resetPasswordEditQueryServices = new QueryService(API_ENDPOINTS.RESET_PASSWORD, PATH_TYPES.ROOT, headers);

  return useMutation(input => resetPasswordEditQueryServices.resetPasswordEdit(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useValidateTokenQuery = onSuccessHandler => {
  const { uid, accessToken, client } = getUserData();
  const validateQueryServices = new QueryService(API_ENDPOINTS.VALIDATE_TOKEN, PATH_TYPES.ROOT);

  return useQuery(
    [API_ENDPOINTS.VALIDATE_TOKEN, "VALIDATE_TOKEN"], 
    async () => {
      const { data, meta } =  await validateQueryServices.get({ uid, "access-token": accessToken, client });
      return { data, meta };
    }, {
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
    enabled: !!uid && !!accessToken && !!client,
    onSuccess: (data) => onSuccessHandler(data)
  });
} 