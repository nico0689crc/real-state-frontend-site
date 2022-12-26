import { useDispatch, useSelector } from "react-redux";
import AppLoader from "components/core/AppLoader/AppLoader";
import { useEffect } from "react";
import { authActions } from "store/auth/authSlice";
import { useValidateTokenQuery } from "hooks/queries/auth/authQueries";
import getUserData from "lib/getUserData";

const AppAuth = ({children}) => {
  const dispatch = useDispatch();
  
  const { isLoading } = useSelector(state => state.authStore);

  const onSuccessHandler = (response) => {
    const { data } = response;
    const { uid, accessToken, client, tokenExpirationDate } = getUserData();
    
    dispatch(authActions.toggleAuthModalStatus(false));
    dispatch(authActions.login({
      auth: {
        accessToken: accessToken,
        uid: uid,
        client: client,
        tokenExpirationDate: tokenExpirationDate,
        user: data
      }
    }));
  }


  const { isFetching, isSuccess } = useValidateTokenQuery(onSuccessHandler);

  useEffect(() => {
    !isFetching && dispatch(authActions.setIsLoading({isLoading: false}));
  },[isFetching, isSuccess, dispatch]);

  return (
    isLoading ? (
      <AppLoader />
    ) : (
      <>{children}</>
    )
  );
}

export default AppAuth;
