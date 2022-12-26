import { IconButton, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchInputComponent from "components/ui/Inputs/SearchInputComponent/SearchInput";
import { Close } from "@mui/icons-material";

const SearchInputMobile = ({mobileSearchInputOpened, toggleMobileSearchInput}) => {
  return (
    <AnimatePresence initial={false}>
      {mobileSearchInputOpened && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <motion.div
            variants={{ collapsed: { scale: 0.7 }, open: { scale: 1 } }}
            transition={{ duration: 0.4 }}
          >
            <Stack direction="row" spacing={1}>
              <SearchInputComponent />
              <IconButton color="primary" onClick={toggleMobileSearchInput}>
                <Close />
              </IconButton>
            </Stack>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default SearchInputMobile