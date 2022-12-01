import { useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./css/App.css";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

import { Login } from "./components/Login";
import UserList from "./components/UserList";
import useToken from "./useToken";
import "./css/commonfont.css";
import Reports from "./components/Reports";

function App() {
  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <Routes>
      {token ? (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userlist" element={<UserList />} />
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
