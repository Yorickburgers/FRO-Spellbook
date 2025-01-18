import './App.css'
import {Routes, Route} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Catalogue from "./pages/catalogue/Catalogue.jsx";
import SpellPage from "./pages/spellPage/SpellPage.jsx";

function App() {

  return (
    <>
      <Navigation/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/spells" element={<Catalogue/>}/>
          <Route path="/favourites" />
          <Route path="/search" />
          <Route path="/login" />
          <Route path="*" />
          <Route path="/spells/acid-arrow" element={<SpellPage/>}/>
      </Routes>
    </>
  )
}

export default App
