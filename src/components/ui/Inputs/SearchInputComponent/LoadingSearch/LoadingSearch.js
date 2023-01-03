import { CircularProgress, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const LoadingSearch = () => {
  
  return (
    <List dense={true}>
      <ListItem disablePadding sx={{ columnGap: 1, justifyContent: "center"}}>
        <ListItemIcon sx={{minWidth: 0}}>
          <CircularProgress color="inherit" size={15}/>
        </ListItemIcon>
        <ListItemText primary={"Searching properties..."} sx={{ flexGrow: 0 }} />
      </ListItem>
    </List>
  )
}

export default LoadingSearch;