import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/notfound";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import ProtectedRoutes from "./components/protectedRoutes";
import { UserProvider } from "./utils/userContext";
import { Container } from "@mui/material";
import NavigationBar from "./components/navigation";
import EmployeesTable from "./components/employees";
import DepartmentsTable from "./components/departments";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoutes>
              <EmployeesTable />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoutes>
              <DepartmentsTable />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
