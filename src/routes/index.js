import { lazy } from "react";
import { AuthRolesSets } from "constants/authConstanst";
import { Navigate } from "react-router-dom";

const Error401 = lazy(() => import('pages/error_pages/Error401'));
const Error403 = lazy(() => import('pages/error_pages/Error403'));
const Error404 = lazy(() => import('pages/error_pages/Error404'));
const Error500 = lazy(() => import('pages/error_pages/Error500'));
const Error503 = lazy(() => import('pages/error_pages/Error503'));
const ComingSoon = lazy(() => import('pages/error_pages/ComingSoon'));
const Maintenance = lazy(() => import('pages/error_pages/Maintenance'))
const Favorites = lazy(() => import('pages/favorites/Favorites'));
const Home = lazy(() => import('pages/home/Home'));
const Properties = lazy(() => import('pages/properties/Properties'));
const RealEstate = lazy(() => import('pages/real_estates/RealEstate'));
const Contact = lazy(() => import('pages/contact/Contact'));

const privateStructure = {
  routes: [
    { path: '/favorites', element: <Favorites />, permittedRole: AuthRolesSets.userRegular }
  ]
};

const publicStructure = {
  routes: [
    { path: '/error-pages/error-401', element: <Error401 />, permittedRole: AuthRolesSets.any }, 
    { path: '/error-pages/error-403', element: <Error403 />, permittedRole: AuthRolesSets.any  }, 
    { path: '/error-pages/error-404', element: <Error404 />, permittedRole: AuthRolesSets.any  }, 
    { path: '/error-pages/error-500', element: <Error500 />, permittedRole: AuthRolesSets.any  }, 
    { path: '/error-pages/error-503',element: <Error503 />, permittedRole: AuthRolesSets.any  }, 
    { path: '/error-pages/coming-soon',element: <ComingSoon />, permittedRole: AuthRolesSets.any  }, 
    { path: '/error-pages/maintenance',element: <Maintenance />, permittedRole: AuthRolesSets.any  }, 
    { path: '/properties', element: <Properties />, permittedRole: AuthRolesSets.any },
    { path: '/real_estates', element: <RealEstate />, permittedRole: AuthRolesSets.any },
    { path: '/contact', element: <Contact />, permittedRole: AuthRolesSets.any },
    { path: '/auth', element: <Home />, permittedRole: AuthRolesSets.any },
    { path: '/auth/password/edit', element: <Home />, permittedRole: AuthRolesSets.any },
    { path: '/', element: <Home />, permittedRole: AuthRolesSets.any },
    { path: '*',element: <Navigate to='/error-pages/error-404' />, permittedRole: AuthRolesSets.any  }
  ]
};

export { privateStructure, publicStructure };