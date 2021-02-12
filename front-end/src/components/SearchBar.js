import React, {useState} from 'react';

const SearchBar = () => {

    const [search, setSearch] = useState("");

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        setSearch("");
    }

    return ( 
        <form className="search">
        <input
          value={search}
          onChange={handleSearchInput}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}
 
export default SearchBar;