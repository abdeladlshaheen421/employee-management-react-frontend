import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../utils/userContext";
import NavigationBar from "../navigation";
import { Container } from "@mui/material";

export default function ProtectedRoutes({ children }) {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to={"/login"} replace />;
  return (
    <Container style={{ padding: "20px" }}>
      <NavigationBar />
      {children}
    </Container>
  );
}
