import { WatchLaterOutlined } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const RecentSearch = ({recentSearchItems}) => {
  const recentSearchItemsMock = [
    { searchText: "experience wish farther steamits" },
    { searchText: "then simplest frame surroundeddoor" },
    { searchText: "greater among country seasonstand" },
    { searchText: "hot clean couple kidspipe" },
    { searchText: "iron throughout sent desertwatch" },
    { searchText: "over managed can tribefort" },
    { searchText: "globe motor successful popularmaster" },
    { searchText: "becoming wind book earsmallest" },
    { searchText: "mix voice third specialgrown" },
    { searchText: "happened alphabet trace hardbreakfast" },
    { searchText: "fog sometime two monkeyavoid" }
  ]

  const items = [
    ...(recentSearchItems || recentSearchItemsMock)
  ];
  
  return (
    <List dense={true}>
      {items.length === 0 ? (
        <ListItem disablePadding sx={{ columnGap: 1, justifyContent: "center"}}>
          <ListItemIcon sx={{minWidth: 0}}>
            <WatchLaterOutlined fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary={"No Recents Search"} sx={{ flexGrow: 0 }} />
        </ListItem>
      ) : (
        items.slice(0, 5).map(item => (
          <ListItem disablePadding>
            <ListItemButton sx={{columnGap: 1}}>
              <ListItemIcon sx={{minWidth: 0}}>
                <WatchLaterOutlined fontSize="small"/>
              </ListItemIcon>
              <ListItemText primary={item.searchText} />
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  )
}

export default RecentSearch;