import { Stack, useMediaQuery, useTheme } from "@mui/material"
import { Search } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import HeaderActionButton from "components/ui/Buttons/HeaderActionButton/HeaderActionButton";
import SearchInputComponent from "components/ui/Inputs/SearchInputComponent/SearchInput";

const SearchInput = ({toggleMobileSearchInput, mobileSearchInputOpened}) => {
  const theme = useTheme();
  const isUpMdBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack flexGrow={1} alignItems={{xs: "end", md: "center"}}>
      {isUpMdBreakpoint ? (
        <SearchInputComponent />
      ) : (
        <AnimatePresence initial={false}>
          {!mobileSearchInputOpened && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1 },
                collapsed: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <HeaderActionButton 
                icon={ <Search color="primary"/> }
                onClickHandler={toggleMobileSearchInput}
              />    
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Stack>
  );
}

export default SearchInput;