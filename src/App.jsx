import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Catalogue from "./pages/catalogue/Catalogue.jsx";
import SpellPage from "./pages/spellPage/SpellPage.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import SearchResults from "./pages/searchResults/SearchResults.jsx";
import Favourites from "./pages/favourites/Favourites.jsx";
import Account from "./pages/account/Account.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
const {isLoggedIn} = useContext(AuthContext);
  return (
    <>
      <Navigation/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/spells" element={isLoggedIn ? <Catalogue/> : <Navigate to="/account"/>}/>
          <Route path="/favourites" element={isLoggedIn ? <Favourites/> : <Navigate to="/account"/>}/>
          <Route path="/spells/search/:searchTerm" element={isLoggedIn ? <SearchResults/> : <Navigate to="/account"/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/spells/:id" element={isLoggedIn ? <SpellPage/> : <Navigate to="/account"/>}/>
      </Routes>
    </>
  )
}

export default App
