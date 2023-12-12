import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import LandingPage from './pages/Landing';
import Analytics from './pages/Analytics';
import './App.css';
import Navbar from './components/Navbar';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "hsl(210, 22%, 12%)",
        color: "white",
      },
    },
  },
});



function App() {
  return (
    <ChakraBaseProvider theme={theme}>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact  path="/analytics" element={<Analytics/>} ></Route>
        <Route exact path="/" element={<LandingPage />} ></Route>
      </Routes>
    </Router>
    </ChakraBaseProvider>
  
  );
}

export default App;
