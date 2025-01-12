import './App.css'
import {Routes, Route} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";

function App() {

  return (
    <>
      <Navigation/>
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
