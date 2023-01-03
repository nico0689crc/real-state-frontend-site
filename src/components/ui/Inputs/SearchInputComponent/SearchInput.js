import { useEffect, useRef, useState } from "react";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import RecentSearch from "./RecentSearch/RecentSearch";
import usePropertiesQuery from "hooks/queries/properties/usePropertiesQuery";
import LoadingSearch from "./LoadingSearch/LoadingSearch";
import ResultSearch from "./ResultSearch/ResultSearch";

const MIN_CHARACTERES_TO_SEARCH = 3;

const SearchInputComponent = () => {
  const { t } = useTranslation();
  const [showClearSearchInput, setShowClearSearchInput] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(true);
  const [searchResultParams, setSearchResultParams] = useState(null);
  const inputRef = useRef(null);
  
  const { isFetching, isSuccess, data: properties, refetch: refetchProperties } = usePropertiesQuery({ 
    params: searchResultParams,
    config: { enabled: false } 
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(inputRef.current.firstChild.value.length > MIN_CHARACTERES_TO_SEARCH){

        refetchProperties();
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchResultParams, refetchProperties])

  const onChangeSearchInputHandler = (event) => {
    const value = event.target.value;
    setShowClearSearchInput(value.length > 0);

    if(value.length > MIN_CHARACTERES_TO_SEARCH){
      setSearchResultParams({ "page[size]": 5, "filter[title]": value});
    }
  }

  const onFocusSearchInputHandler = () => setShowSearchResult(true);
  const onBlurSearchInputHandler = () => setShowSearchResult(true);

  const onClearSearchInputHandler = () => {
    inputRef.current.firstChild.value = "";
    setShowClearSearchInput(false);
  }

  let searchContent;
  if(inputRef?.current?.firstChild?.value.length <= MIN_CHARACTERES_TO_SEARCH) {
    searchContent = <RecentSearch recentSearchItems={[]}/>;
  } else {
    searchContent = !properties?.data ? <LoadingSearch /> : <ResultSearch properties={properties.data}/>;
  }

  return (
    <Stack direction="row" sx={{position: "relative", width: "100%", maxWidth: "45rem" }}>
      <Stack position="relative" flexGrow={1}>
        <InputBase 
          className={`InputBaseSearchInput ${showSearchResult && "NonBorderBottomRadius"}`}
          ref={inputRef}
          onChange={onChangeSearchInputHandler}
          onFocus={onFocusSearchInputHandler}
          onBlur={onBlurSearchInputHandler}
          placeholder={t("search_input.placeholder")}
        />
        {showClearSearchInput && (
          <IconButton className="MuiIconButtonClearSearchInput" onClick={onClearSearchInputHandler}>
            <Close/>
          </IconButton>
        )}
      </Stack>
      <IconButton className={`MuiIconButtonSearchInput ${showSearchResult && "NonBorderBottomRadius"}`}>
        <Search color="primary"/>
      </IconButton>
      <AnimatePresence initial={false}>
        {showSearchResult && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            style={{
              position: "absolute", 
              bottom: 0, 
              transform: "translateY(100%)",
              zIndex: 1,
              width: "100%"
            }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Paper 
              sx={{
                borderTopLeftRadius: 0, 
                borderTopRightRadius: 0
              }}
            >
              {searchContent}
            </Paper>
          </motion.section>
        )}
      </AnimatePresence>
    </Stack>
  )
}

export default SearchInputComponent;