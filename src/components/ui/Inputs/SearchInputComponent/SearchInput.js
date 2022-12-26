import { useRef, useState } from "react";
import { Close, Search } from "@mui/icons-material";
import { IconButton, InputBase, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const SearchInputComponent = () => {
  const { t } = useTranslation();
  const [showClearSearchInput, setShowClearSearchInput] = useState(false);
  const inputRef = useRef(null);

  const onChangeSearchInputHandler = (event) => {
    setShowClearSearchInput(event.target.value.length > 0);
  }

  const onClearSearchInputHandler = () => {
    inputRef.current.firstChild.value = "";
    setShowClearSearchInput(false);
  }

  return (
    <Stack direction="row" width="100%" paddingX={{md: "5rem", xl: "5rem"}}>
      <Stack position="relative" flexGrow={1}>
        <InputBase 
          className="InputBaseSearchInput" 
          ref={inputRef}
          onChange={onChangeSearchInputHandler}
          placeholder={t("search_input.placeholder")}
        />
        {showClearSearchInput && (
          <IconButton className="MuiIconButtonClearSearchInput" onClick={onClearSearchInputHandler}>
            <Close/>
          </IconButton>
        )}
      </Stack>
      <IconButton className="MuiIconButtonSearchInput">
        <Search color="primary"/>
      </IconButton>
    </Stack>
  )
}

export default SearchInputComponent;