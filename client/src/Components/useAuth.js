import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios.get("http://localhost:3001/check-auth", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
};

export default useAuth;
