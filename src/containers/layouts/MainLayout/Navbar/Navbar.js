import { Box, Container, Divider, Drawer, IconButton, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Close, ContactSupport, FavoriteBorder, Home, Logout, PermIdentity } from "@mui/icons-material";
import { IconBuildingCommunity, IconBuildingStore } from "@tabler/icons";
import { uisActions } from "store/ui/uiSlice";
import { authActions } from "store/auth/authSlice";
import { CheckPermission } from "lib/RouteGenerator";
import API_ENDPOINTS from "constants/endpoints";
import { AuthRolesSets } from "constants/authConstanst";
import Logo from "../Header/Logo";
import NavbarItem from "./NavbarItem";
import AuthUserInfo from "components/app/AuthUserInfo/AuthUserInfo";

const links = [{
  key: "home",
  label: "navbar.labels.home",
  icon: <Home />,
  to: API_ENDPOINTS.ROOT,
  showOnDesktop: true,
  permittedRole: AuthRolesSets.any
},{
  key: "properties",
  label: "navbar.labels.properties",
  icon: <IconBuildingCommunity />,
  to: API_ENDPOINTS.PROPERTIES,
  showOnDesktop: true,
  permittedRole: AuthRolesSets.any
},{
  key: "real_estates",
  label: "navbar.labels.real_estates",
  icon: <IconBuildingStore />,
  to: API_ENDPOINTS.REAL_ESTATES,
  showOnDesktop: true,
  permittedRole: AuthRolesSets.any
},{
  key: "contact",
  label: "navbar.labels.contact",
  icon: <ContactSupport />,
  to: API_ENDPOINTS.CONTACT,
  showOnDesktop: true,
  permittedRole: AuthRolesSets.any
},{
  key: "favorites",
  label: "navbar.labels.favorites",
  icon: <FavoriteBorder />,
  to: API_ENDPOINTS.FAVORITES,
  showOnDesktop: false,
  permittedRole: AuthRolesSets.userRegular
}];

const Items = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const { user, isAuthenticated } = useSelector(state => state.authStore);
  
  const toggleNavbarMobileOpenHandler = () => {
    dispatch(uisActions.toggleNavbarMobileOpen());
  }

  const toggleeAuthModalHanlder = () => {
    dispatch(authActions.toggleAuthModalStatus());
    toggleNavbarMobileOpenHandler();
  }

  const navitageClickHandler = (link) => {
    !isUpMd && toggleNavbarMobileOpenHandler();
    navigate(link.to);
  }

  const onLogOutClickHandler = () => {
    dispatch(authActions.logout());
    toggleNavbarMobileOpenHandler();
    navigate(API_ENDPOINTS.ROOT);
  }

  const content = links.map(link => {
    if (CheckPermission(link.permittedRole, user.user_role)) {
      return <NavbarItem key={link.key} link={link} onClickHandler={() => navitageClickHandler(link)}/>
    }

    return null;
  });

  return (
    <Stack direction={{xs: "column", md: "row"}} flexGrow={1} spacing={{xs: 1, md: 0}}>
      <>
        {content}
        {isAuthenticated ? (
          <NavbarItem 
            link={{ key: "auth", label: "navbar.labels.logout", icon: <Logout />, showOnDesktop: false }} 
            onClickHandler={onLogOutClickHandler}
          />
        ) : (
          <NavbarItem 
            link={{ key: "auth", label: "navbar.labels.auth", icon: <PermIdentity />, showOnDesktop: false }} 
            onClickHandler={toggleeAuthModalHanlder}
          />
        )}
      </>
    </Stack>
  );
}

const DrawerMobile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.authStore);

  const { navbarMobileOpen } = useSelector(state => state.uiStore);

  const toggleNavbarMobileOpenHandler = () => {
    dispatch(uisActions.toggleNavbarMobileOpen());
  }
  
  return (
    <Drawer
      anchor="right"
      open={navbarMobileOpen}
      onClose={toggleNavbarMobileOpenHandler}
      transitionDuration={theme.transitions.duration.complex}
    >
      <Stack width="80vw" height="100%">
        <Stack alignItems="center" padding={2}>
          <Logo />
        </Stack>
        <Divider />
        {isAuthenticated && (
          <>
            <Box padding={2}>
              <AuthUserInfo />
            </Box>
            <Divider />
          </>
        )}
        <Items />
        <Divider />
        <IconButton sx={{
          alignSelf: "center", 
          padding: "1rem",
          "&:hover": {
            backgroundColor: "transparent"
          }
        }} color="primary" onClick={toggleNavbarMobileOpenHandler}>
          <Close />
        </IconButton>
      </Stack>
    </Drawer>
  );
}

const NavbarDesktop = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[50] }} >
      <Container maxWidth="xl">
        <Items />
      </Container>
    </Box>
  )
}

const Navbar = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    isUpMd ? <NavbarDesktop /> : <DrawerMobile />
  )
}

export default Navbar;