import axios from "axios";
import {useEffect} from "react";

import {useNavigate} from "react-router-dom";
import useAuth from "./useAuth";
import {useSelector} from "react-redux";
const axiosSecure = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = useAuth();
  const storedAccessToken = useSelector((state) => state?.auth?.token);
  useEffect(() => {
    //1. intercept request (client ---> server)
    axiosSecure.interceptors.request.use((config) => {

    
      if (storedAccessToken) {
        config.headers.Authorization = storedAccessToken;
      }
      return config;
    });
    // 2. intercept response (client <--- server)
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          (error.response && error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  return [axiosSecure];
};
export default useAxiosSecure;
