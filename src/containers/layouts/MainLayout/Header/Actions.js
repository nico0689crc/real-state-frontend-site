import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { FavoriteBorder, Menu, PermIdentity } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uisActions } from "store/ui/uiSlice";
import { authActions } from "store/auth/authSlice";
import { CheckPermission } from "lib/RouteGenerator";
import { AuthRolesSets } from "constants/authConstanst";
import HeaderActionButton from "components/ui/Buttons/HeaderActionButton/HeaderActionButton";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdown";
import API_ENDPOINTS from "constants/endpoints";
import AuthUserInfo from "components/app/AuthUserInfo/AuthUserInfo";

const Actions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.authStore);
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));


  const toggleNavbarMobileOpenHandler = () => {
    dispatch(uisActions.toggleNavbarMobileOpen());
  }

  const onFavoriteClickHandler = () => {
    navigate(API_ENDPOINTS.FAVORITES);
  }

  const onAuthClickHandler = () => {
    dispatch(authActions.toggleAuthModalStatus());
  }

  return (
    <Stack direction="row" spacing={{ xs: 1, md: 2}} alignItems="center">
      {isUpMd ? (
        <>
          <LanguageDropdown />
          {CheckPermission(AuthRolesSets.userRegular, user.user_role) && (
            <HeaderActionButton icon={<FavoriteBorder color="primary"/>} onClickHandler={onFavoriteClickHandler} />
          )}
          {isAuthenticated ? (
            <AuthUserInfo />
          ):(
            <HeaderActionButton icon={<PermIdentity color="primary"/>} onClickHandler={onAuthClickHandler} />
          )}
        </>
      ) : (
        <>
          <LanguageDropdown />
          <HeaderActionButton icon={<Menu color="primary"/>} onClickHandler={toggleNavbarMobileOpenHandler} />
        </>
      )}
    </Stack>
  )
}

export default Actions;