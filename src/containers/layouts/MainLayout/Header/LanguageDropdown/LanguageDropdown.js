import { useEffect, useState } from "react";
import { ChevronRight, Language} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import i18next from "i18next";
import { ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import HeaderActionButton from "components/ui/Buttons/HeaderActionButton/HeaderActionButton";

const languages = [{
  key: "en",
  label: "English"
},{
  key: "es",
  label: "Español"
}];

const LanguageDropdown = () => {
  const [languageDropdownOpened, setLanguageDropdownOpened] = useState(false);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const { language, changeLanguage } = i18next;

  const onClickLanguageHandler = () => {
    setLanguageDropdownOpened(() => !languageDropdownOpened);
  }

  useEffect(()=>{
    const index = languages.findIndex(lang => language === lang.key);
    setCurrentLanguageIndex(index > -1 ? index : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleMenuItemClick = (event, index) => {
    changeLanguage(languages[index].key);
    setCurrentLanguageIndex(index);
    setLanguageDropdownOpened(false);
  };

  return (
    <Stack position="relative">
      <HeaderActionButton icon={<Language color="primary"/>} onClickHandler={onClickLanguageHandler}/>
      <AnimatePresence initial={false}>
        {languageDropdownOpened && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            style={{ position: "absolute", right: 0, top: "110%", zIndex: 1 }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ClickAwayListener onClickAway={onClickLanguageHandler}>
              <motion.div
                variants={{ collapsed: { scale: 0.7 }, open: { scale: 1 } }}
                transition={{ duration: 0.4 }}
              >
                <Paper elevation={3} sx={{borderRadius: "0.5rem", overflow: "hidden"}}>
                  <List sx={{ flexGrow: 1, padding: 0 }}>
                    {languages.map((language, index) => (
                      <ListItem
                        key={language.key}
                        onClick={(event) => handleMenuItemClick(event, index)} 
                        className={`ListItemDropdown ${(index === currentLanguageIndex) && "ListItemDropdownSelected"}`}
                      >
                        <ListItemIcon>
                          <ChevronRight />
                        </ListItemIcon>
                        <ListItemButton>
                          <ListItemText primary={language.label} sx={{textAlign: "right"}}/>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </ClickAwayListener>
          </motion.section>
        )}
      </AnimatePresence>
    </Stack>
  )
}

export default LanguageDropdown;