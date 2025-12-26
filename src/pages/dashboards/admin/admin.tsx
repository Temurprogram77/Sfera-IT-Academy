import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate]);

  return <div>admin</div>;
};

export default admin;
