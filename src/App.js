import React from 'react'
import { Route, Routes } from 'react-router-dom';
import "./App.css"
import BottomNavbar from './Components/Bottom Navbar/BottomNavbar';
import Header from './Components/Header/Header'
import Trending from "./Components/Pages/Trending/Trending"
import Series from "./Components/Pages/Series/Series"
import Search from "./Components/Pages/Search/Search"
import Movies from "./Components/Pages/Movies/Movies"
import Error from "./Components/Pages/Error/Error"


const App = () => {
  return (
    <div>
      <Header />
      <div className="app container-fluid">
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default App