import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import ErrorBoundary from "components/core/ErrorBoundary/ErrorBoundary";
import GenerateRoutes from "lib/RouteGenerator";
import { privateStructure, publicStructure } from "routes";
import { memo } from "react";
import AppSnackBar from "components/ui/SnackBar/AppSnackBar";

const AppLayout = () => {
  const { isAuthenticated, user } = useSelector(state => state.authStore);

  const generateRoutesArray = GenerateRoutes({
    isAuthenticated: isAuthenticated,
    userRole: user.user_role,
    privateStructure, 
    publicStructure
  });
  
  const routes = useRoutes(generateRoutesArray);

  return(
    <ErrorBoundary>
      {routes}
      <AppSnackBar />
    </ErrorBoundary>
  );
}

export default memo(AppLayout);