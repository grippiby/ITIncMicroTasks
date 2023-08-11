import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useAppDispatch, useAppSelector } from "./store";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Menu } from "@mui/icons-material";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { logoutTC } from "../features/login/authReducer";

function App() {
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  const isInitialized = useAppSelector<boolean>(
    (state) => state.app.isInitialized
  );
  const logout = useCallback(function () {
    dispatch(logoutTC());
  }, []);
  const login = useCallback(function () {
    dispatch(logoutTC());
  }, []);
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  /* console.log(isLoggedIn, isInitialized);*/
  if (isLoggedIn) {
    <Navigate to={"/login"} />;
  }
  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {!isLoggedIn === true ? (
            <Button color="inherit">Login</Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
          {/*<Button color="inherit">Login</Button>*/}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
