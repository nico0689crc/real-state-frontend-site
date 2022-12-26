import { IconButton } from "@mui/material";

const HeaderActionButton = ({icon, onClickHandler = () => {}}) => {
  return (
    <IconButton className="MuiIconButtonHeaderActionButton" onClick={onClickHandler}>
      {icon}
    </IconButton>
  );
}

export default HeaderActionButton;