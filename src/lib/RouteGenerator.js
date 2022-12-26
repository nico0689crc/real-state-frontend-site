import React from 'react';
import { UnAuthorizedPath } from 'constants/authConstanst';
import { Navigate } from 'react-router-dom';
import MainLayout from 'containers/layouts/MainLayout/MainLayout';

export const CheckPermission = (routeRole, userRole) => {
  if (!routeRole || !routeRole) {
    return true;
  }

  if (userRole && Array.isArray(userRole) && !Array.isArray(routeRole)) {
    return userRole.indexOf(routeRole) >= 0;
  }
  if (routeRole.length === 0) {
    return !userRole || userRole.length === 0;
  }
  if (userRole && Array.isArray(userRole) && Array.isArray(routeRole)) {
    return routeRole.some((r) => userRole.indexOf(r) >= 0);
  }
  return routeRole.indexOf(userRole) >= 0;
};

const routesGenerator = (isAuthenticated, routeSet, type, userRole) => {
  const { routes } = routeSet;
  const generatedRoutes = [];

  if (!routes || (!Array.isArray(routes) && routes.length === 0)) {
    return generatedRoutes;
  }

  routes.forEach((route) => {
    const { permittedRole } = route;

    if (type === 'public') {
      return generatedRoutes.push(route);
    }

    if (!isAuthenticated || !CheckPermission(permittedRole, userRole)) {
      return generatedRoutes.push({
        path: route.path,
        element: <Navigate to={UnAuthorizedPath} replace />
      });
    }

    return generatedRoutes.push(route);
  });

  return generatedRoutes;
};


const GenerateRoutes = ({ isAuthenticated, privateStructure, publicStructure, userRole }) => {
  const privateGeneratedRoutes = routesGenerator(isAuthenticated, privateStructure, 'private', userRole);
  const publicGeneratedRoutes = routesGenerator(isAuthenticated, publicStructure, 'public', userRole);

  const dynamicRoutes = [{
    path: '/',
    element: <MainLayout />,
    children: [
      ...privateGeneratedRoutes,
      ...publicGeneratedRoutes
    ]
  }];

  return dynamicRoutes;
};

export default GenerateRoutes;

