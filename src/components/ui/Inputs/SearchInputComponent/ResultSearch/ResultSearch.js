import { LocationOnOutlined, MapsHomeWorkOutlined, RoomPreferencesOutlined, SearchOffOutlined } from "@mui/icons-material";
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PropertyDetail = ({itemLabel, icon}) => {

  return (
    <Stack direction="row" spacing={0.5}>
      {icon}
      <Typography color="GrayText" variant="caption">{itemLabel}</Typography>
    </Stack>
  );
}

const ResultSearch = ({properties = []}) => {
  const { t } = useTranslation();

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
            <ListItemButton sx={{ paddingY: 1, paddingX: 2 }}>
              <Stack spacing={0.5}>
                <Typography variant="body1">{item.title}</Typography>
                <Grid container gap={2}>
                  <Grid item xs={12} md="auto" justifyContent="center">
                    <PropertyDetail 
                      itemLabel={item.address} 
                      icon={<LocationOnOutlined color="GrayText" fontSize="small"/>}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <PropertyDetail 
                      itemLabel={t(`properties.${item.p_type}`)} 
                      icon={<MapsHomeWorkOutlined color="GrayText" fontSize="small" />}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <PropertyDetail 
                      itemLabel={t(`properties.${item.p_status}`)} 
                      icon={<RoomPreferencesOutlined color="GrayText" fontSize="small" />}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  )
}

export default ResultSearch;