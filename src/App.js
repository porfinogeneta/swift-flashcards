import './App.css';
// components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// router
import { HashRouter, Route, Routes} from "react-router-dom";
import Course from "./pages/Course";

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Navbar/>
            <h1>Welcome to flashcards</h1>
           <Routes>
               <Route element={<Home/>} path={"/"}></Route>
               <Route element={<Course/>} path={"/course/:lang/:amount"}></Route>
           </Routes>
        </HashRouter>

    </div>
  );
}

export default App;
