import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

const SearchBoxDiv = styled('div')({
    backgroundColor: "#E7EDF1", 
    display:"flex", 
    alignItems:"center", 
    gap:"5px",
    padding:"5px",
    borderRadius:"5px",
  });


export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const searchTextRef = React.useRef(null);

  return (
    <SearchBoxDiv>
      <div>
        <SearchIcon style={{ color: "black", marginTop:"5px" }}/>
      </div>
      <InputBase
        ref={searchTextRef}
        value={searchText}
        autoFocus={true}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
      />
    </SearchBoxDiv>
  );
}
