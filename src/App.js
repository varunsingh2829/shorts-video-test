import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import AuthProvider from "./authprovider";
let App = () => {
  return (
    <>
      <AuthProvider>

    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>}>
          
        </Route>
        <Route exact path="/" element={<Home/>}>
          
        </Route>
      </Routes>
    </Router>
      </AuthProvider>
    
    </>
  );
    
  
}

export default App;
