import React from 'react';
import { Routes, Route,Router } from 'react-router-dom';
// import Navbar from './Components/NavBar';
import About from './Components/About';
import Signin from './Components/Signin';
import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import MainPage from './Components/MainPage';
import Userprofile from './Components/Userprofile';
import Editpost from './Components/Editpost';
import Addpost from './Components/Addpost';
import Logoutpage from './Components/LogoutPage';
// import Footer from './Components/Footer';
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
     <AuthProvider>
        <Routes> 
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/editpost" element={<Editpost />} />
           <Route path="/addpost" element={<Addpost />} />
           <Route path='/logout' element={<Logoutpage/>}/>
         </Routes>
        </AuthProvider>
    // <Homepage/>
  );
}

export default App;
