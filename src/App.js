import './App.css';
// components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// router
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Course from "./pages/Course";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
           <Routes>
               <Route element={<Home/>} path={"/"}></Route>
               <Route element={<Course/>} path={"/course/:lang/:amount"}></Route>
           </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
