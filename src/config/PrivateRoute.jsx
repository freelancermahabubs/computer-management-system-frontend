import {Navigate, useLocation} from "react-router";
import {useState, useEffect} from "react";
import Loader from "../components/loader/Loader";
import {useSelector} from "react-redux";
const PrivateRoute = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  const location = useLocation();
  const storedAccessToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (storedAccessToken) {
      setAccessToken(` ${storedAccessToken}`);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (accessToken) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;
