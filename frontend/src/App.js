import './App.css';
import {BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Post from './Components/Post';
import About from './Components/About';


function App() {
//  const port = process.env.REACT_APP_PORT
 const port = process.env.REACT_APP_PORT
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route  path='/signup' element={<Signup port={port} />} ></Route>
        <Route  path='/login' element={<Login port={port} />} ></Route>
        <Route  path='/post' element={<Post port={port}  />} ></Route>
        <Route path='/' element={<Post port={port} />} ></Route>
        <Route  path='/about' element={<About/>}></Route>
      </Routes>
    </Router>
  
  );
}

export default App;
