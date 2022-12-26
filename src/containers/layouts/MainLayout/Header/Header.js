import { useState } from "react";
import { Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import Actions from "./Actions";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

import SearchInputMobile from "./SearchInputMobile";

const Header = () => {
  const [mobileSearchInputOpened, setMobileSearchInputOpened] = useState(false);
  const theme = useTheme();
  const isUpMdBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  // theme.typography.fontWeightRegular
  const toggleMobileSearchInput = () => {
    setMobileSearchInputOpened(() => !mobileSearchInputOpened)
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={2} width="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{position: "relative"}}>
          <Logo />
          <SearchInput 
            toggleMobileSearchInput={toggleMobileSearchInput}
            mobileSearchInputOpened={mobileSearchInputOpened}
          />
          <Actions mobileSearchInputOpened={mobileSearchInputOpened} />
        </Stack>
        {!isUpMdBreakpoint && (
          <SearchInputMobile          
            toggleMobileSearchInput={toggleMobileSearchInput}
            mobileSearchInputOpened={mobileSearchInputOpened}
          />
        )}
      </Stack>
    </Container>
  )
}

export default Header;