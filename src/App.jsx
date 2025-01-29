import './App.css'
import {Routes, Route} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Catalogue from "./pages/catalogue/Catalogue.jsx";
import SpellPage from "./pages/spellPage/SpellPage.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import SearchResults from "./pages/searchResults/SearchResults.jsx";
import Favourites from "./pages/favourites/Favourites.jsx";
import Account from "./pages/account/Account.jsx";

function App() {

  return (
    <>
      <Navigation/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/spells" element={<Catalogue/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/spells/search/:searchTerm" element={<SearchResults/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/spells/:id" element={<SpellPage/>}/>
      </Routes>
    </>
  )
}

export default App
