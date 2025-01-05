import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { logout } from "../../utils/api.functions";
import { UserContext } from "../../utils/userContext";
import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  const { setUser } = useContext(UserContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem",
        gap: "1.5rem",
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#1976d2" : "#000",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "all 0.3s ease",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/employees"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#1976d2" : "#000",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "all 0.3s ease",
        })}
      >
        Employees
      </NavLink>

      <NavLink
        to="/departments"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#1976d2" : "#000",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "all 0.3s ease",
        })}
      >
        Departments
      </NavLink>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setUser(null);
          logout();
        }}
        sx={{
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          textTransform: "none",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "#9e0030",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
