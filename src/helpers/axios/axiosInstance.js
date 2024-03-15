import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent

    const accessToken = JSON?.parse(localStorage?.getItem("persist:auth"));
    
 
    if (accessToken?.token) {
      config.headers.Authorization = accessToken?.token.replace(/"/g, '');
    }
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const responseObject = {
      data: response?.data,
      meta: response?.data,
    };
    return responseObject;
  },
  function (error) {
    toast.error(
      error?.response?.data?.errorMessages[0]?.message || "Something went wrong"
    );
    const responseObject = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
    // return Promise.reject(error);
  }
);

export {instance};
