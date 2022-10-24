import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, ProtectedRoutes, Register} from "./components/index.js";

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          
          <Route path="/register" element={<Register/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
