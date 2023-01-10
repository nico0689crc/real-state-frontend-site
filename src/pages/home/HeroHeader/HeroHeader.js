import { Button, Card, Container, Grid, MenuItem, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { grey } from "@mui/material/colors";
import { propertiesTypes, propertiesRooms, propertiesBeds, propertiesBaths } from "./constants";
import heroBackground from "assets/images/hero_background.jpeg";
import { Search } from "@mui/icons-material";

const HeroHeader = () => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();


  return (
    <Stack
      sx={{
        height: "45rem",
        width: "100%",
        backgroundImage: `url(${heroBackground})`,
        backgroundPositionY: "bottom",
        backgroundPositionX: "right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        [theme.breakpoints.up("sm")]: {
          height: "700px"
        }
      }}
    >
      <Container maxWidth="xl" sx={{flexGrow: 1}}>
        <Stack 
          spacing={{xs: 3, sm: 1}} 
          sx={{
            alignItems: "center", 
            height: "100%", 
            paddingTop: "3rem",
            width: "100%",
            [theme.breakpoints.up("sm")]: {
              alignItems: "flex-start",
              maxWidth: "40rem",
              paddingTop: "6rem"
            } 
          }}
        >
          <Typography 
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: "1.75rem",
              textAlign: "center",
              color: grey[900], 
              [theme.breakpoints.up("sm")]: {
                fontSize: "2.5rem",
                fontWeight: "700",
                textAlign: "left"
              }
            }}  
          >
              {t("hero_header.title")}
          </Typography>
          <Typography 
            variant="h6"
            sx={{
              fontWeight: "400",
              fontSize: "1rem",
              textAlign: "center",
              color: grey[700],
              [theme.breakpoints.up("sm")]: {
                fontSize: "1.25rem",
                fontWeight: "400",
                textAlign: "left"
              }
            }}  
          >
            {t("hero_header.sub_title")}
          </Typography>
          <Card 
            sx={{
              width: "100%",
              marginTop: "1rem",
              maxWidth: "25rem",
              padding: 3,
              [theme.breakpoints.up("sm")]: {
                maxWidth: "inherit"
              },
              "&.MuiCard-root": {
                borderRadius: 2,
                boxShadow: "8px 6px 16px 5px rgb(0 0 0 / 2%)"
              }
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField placeholder={t("properties.labels.search_name")} variant="outlined" size="small" fullWidth/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select size="small" label={t("properties.labels.property_type")} fullWidth>
                  {propertiesTypes.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{t(option.label)}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select size="small" label={t("properties.labels.rooms")} fullWidth>
                  {propertiesRooms.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{t(option.label)}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select size="small" label={t("properties.labels.beds")} fullWidth>
                  {propertiesBeds.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{t(option.label)}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select size="small" label={t("properties.labels.baths")} fullWidth>
                  {propertiesBaths.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{t(option.label)}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{
                display: "flex",
                justifyContent: "center"
              }}>
                <Button fullWidth={isDownSm} variant="contained" startIcon={<Search />}>
                  {t("global.labels.search")}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Container>
    </Stack>
  );
}

export default HeroHeader;