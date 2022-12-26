import { Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const NavbarItem = ({link, onClickHandler}) => {
  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    (isDownMd || (isUpMd && link.showOnDesktop)) && (
      <Button 
        variant="text"
        onClick={onClickHandler}
        className={`MuiButtonNavbarItem ${(link.to && location.pathname === link.to) ? "linkActive" : ""}`}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {link.icon}
          <Typography variant="button">{t(link.label)}</Typography>
        </Stack>
      </Button>
    )
  );
}

export default NavbarItem;