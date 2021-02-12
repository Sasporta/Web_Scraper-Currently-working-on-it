import React, {useState} from 'react';

const SearchBar = () => {

    const [searchVal, setSearchVal] = useState("");

    const handleSearchInput = (e) => {
        setSearchVal(e.target.value);
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        setSearchVal("");
    }

    return ( 
        <form className="search">
        <input
          value={searchVal}
          onChange={handleSearchInput}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}
 
export default SearchBar;