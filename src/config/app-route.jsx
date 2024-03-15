import React from "react";
import App from "./../app.jsx";
import {Navigate} from "react-router-dom";

import Error from "../Shared/Error.jsx";
import Register from "../pages/register/Register.jsx";
import Login from "../pages/login/Login.jsx";
import Categories from "../pages/cateories/Categories.jsx";
import Brands from "../pages/brands/Brands.jsx";
import Products from "../pages/products/Products.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const accessTokenString = localStorage.getItem("persist:auth");
const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

const user = accessToken ? JSON.parse(accessToken.user) : null;

const token = user ? user.role : null;
const seller = [
  {
    path: "*",
    errorElement: <Error />,
    element: <App />,

    children: [
      {path: "", element: <Navigate to="/dashboard" />},

      {
        path: "dashboard",

        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      {path: "login", element: <Login />},
      {path: "register", element: <Register />},
      {
        path: "categories",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <PrivateRoute>
            {" "}
            <Brands />
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },

      {
        path: "sales/*",
        children: [],
      },
    ],
  },
];
const buyer = [
  {
    path: "*",
    errorElement: <Error />,
    element: <App />,

    children: [
      {path: "", element: <Navigate to="/dashboard" />},

      {
        path: "dashboard",

        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },

      {path: "login", element: <Login />},
      {path: "register", element: <Register />},
    ],
  },
];

const AppRoute = token === "buyer" ? buyer : seller;
export default AppRoute;
