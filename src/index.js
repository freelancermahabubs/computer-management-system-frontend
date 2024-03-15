import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, useRoutes, useLocation} from "react-router-dom";
import AppRoute from "./config/app-route.jsx";
import {slideToggle} from "./composables/slideToggle.js";

// bootstrap
import "bootstrap";
import "./i18n.js";
// css
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";
import "./scss/styles.scss";
import {Provider} from "react-redux";

import {PersistGate} from "redux-persist/integration/react";
import {Toaster} from "react-hot-toast";
import { persistor, store } from "./redux/store.js";

const container = document.getElementById("root");
const root = createRoot(container);
function App() {
  let element = useRoutes(AppRoute);
  let location = useLocation();

  // on every route change
  React.useEffect(() => {
    var elm = document.querySelector(".app");
    if (elm) {
      elm.classList.remove("app-sidebar-mobile-toggled");
    }
    var elm2 = document.querySelector(".app-top-nav");
    if (elm2 && elm2.style.display === "block") {
      slideToggle(document.querySelector(".app-top-nav"));
    }
  }, [location]);

  return element;
}

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
