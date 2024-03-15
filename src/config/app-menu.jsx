const accessTokenString = localStorage.getItem("persist:auth");
const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

const user = accessToken ? JSON.parse(accessToken.user) : null;


const token = user ? user.role : null;

const seller = [
  {is_header: true, title: "Navigation"},
  {path: "/dashboard", icon: "bi bi-cpu", title: "Dashboard"},

  {is_divider: true},
  {is_header: true, title: "PRODUCTS INFORMATIONS"},

  {
    path: "/products",
    icon: "bi bi-window-plus",
    title: "Products",
  },

  {
    path: "/categories ",
    icon: "bi bi-grid-3x3-gap-fill",
    title: "Categories ",
  },
  {
    path: "/brands",
    icon: "bi bi-award-fill",
    title: "Brands",
  },
];
const buyer = [
  {is_header: true, title: "Navigation"},
  {path: "/dashboard", icon: "bi bi-cpu", title: "Dashboard"},

  {is_divider: true},
  {is_header: true, title: "PRODUCTS INFORMATIONS"},
  {
    path: "/products",
    icon: "bi bi-window-plus",
    title: "Products",
  },
];

const Menu = token === "buyer" ? buyer : seller;

export default Menu;
