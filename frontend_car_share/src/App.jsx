import React, {useMemo, useState} from 'react';
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./components/LoginPage"
import SignUpPage from "./components/SignUpPage"
import HomePage from "./components/HomePage"
import { UserContext } from './context/UserContext';
import { ThemeProvider } from '@mui/material';
import theme from "./components/layout/NavBarTheme";
import Navbar from "./components/layout/NavBar";

function App() {

  const [user,setUser] = useState(null)

  const value = useMemo(() => ({ user, setUser}), [user,setUser]);

  return (
      <UserContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
              <Route
                  path='/'
                  element={<HomePage />}>
              </Route>
              <Route
                  path='/login'
                  element={<LoginPage />}>
              </Route>
              <Route
                  path='/signup'
                  element={<SignUpPage />}>
              </Route>

          </Routes>
        </ThemeProvider>
      </UserContext.Provider>
  );
}

export default App;
