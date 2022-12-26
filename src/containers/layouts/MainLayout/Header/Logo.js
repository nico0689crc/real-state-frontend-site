import { Link, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import API_ENDPOINTS from "constants/endpoints";

const Logo = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onHomeClickHandler = () => {
    navigate(API_ENDPOINTS.ROOT);
  }

  return (
    <Link onClick={onHomeClickHandler} sx={{
      display: "flex", 
      alignItems: "center", 
      textDecoration: "none",
      height: "1.5rem",
      cursor: "pointer",
      [theme.breakpoints.up('sm')]: {
        height: "2.5rem"
      }
    }}>
      <img src={logo} alt="Sheltos" height="100%"/>
    </Link>
  )
}

export default Logo;