import { SearchOffOutlined } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";

const ResultSearch = ({properties = []}) => {
  const theme = useTheme();
  
  return (
    <List dense={true}>
      {properties.length === 0 ? (
        <ListItem disablePadding sx={{ columnGap: 1, justifyContent: "center"}}>
          <ListItemIcon sx={{minWidth: 0}}>
            <SearchOffOutlined fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary={"No results in your search"} sx={{ flexGrow: 0 }} />
        </ListItem>
      ) : (
        properties.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{
              padding: 1,
              columnGap: 1,
              height: "58px",
              [theme.breakpoints.up('md')]: {
                padding: 1.5,
                height: "116px",
              },
            }}>
              <Box sx={{
                backgroundImage: `url(${item.media[0].media_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "58px",
                height: "100%",
                [theme.breakpoints.up('md')]: {
                  width: "116px",
                },
              }}></Box>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  )
}

export default ResultSearch;