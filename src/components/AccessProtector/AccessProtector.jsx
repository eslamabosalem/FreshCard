import { Navigate } from "react-router-dom";

export default function AccessProtector({ children }) {
  if (localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/noAccess"} />;
  }
}
