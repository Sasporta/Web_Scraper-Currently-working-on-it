import React, {useEffect, useState} from 'react';
import SearchBar from './components/SearchBar';
import "./App.css";
import OuterContainer from './components/OuterContainer';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <OuterContainer />
    </div>
  );
}

export default App;
