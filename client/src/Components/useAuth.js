import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); //from nora make sure to CHANGE

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(true); // change
      return;
    }

    axios.get("http://localhost:3001/check-auth", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(true)); // change
  }, []);

  return isAuthenticated;
};

export default useAuth;
