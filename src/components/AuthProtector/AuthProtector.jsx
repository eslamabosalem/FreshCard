import { Navigate } from "react-router-dom";

export default function AuthProtector({ children }) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
