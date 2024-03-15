import React, {useEffect, useContext} from "react";
import {Link, Navigate} from "react-router-dom";
import {AppSettings} from "./../../config/app-settings.js";
import toast from "react-hot-toast";
import {useLoginMutation} from "../../redux/api/auth/loginApi.js";
import {verifyToken} from "../../utils/verifyToken.js";
import {setUser} from "../../redux/api/auth/loginSlice.js";
import {useSelector, useDispatch} from "react-redux";
function PagesLogin() {
  const context = useContext(AppSettings);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const storedAccessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentClass("p-0");

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  const handleFormSubmit = async (form) => {
    try {
      const username = form.username.value;
      const password = form.password.value;

      const userInfo = {
        username,
        password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token);

      dispatch(setUser({user, token: res.data.token}));
      toast.success(res.message);
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (storedAccessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="login-content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(e.target);
          }}>
          <h1 className="text-center">Sign In</h1>
          <div className="text-inverse text-opacity-50 text-center mb-4">
            For your protection, please verify your identity.
          </div>
          <div className="mb-3">
            <label className="form-label">
              UserName <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder=""
              name="username"
            />
          </div>
          <div className="mb-3">
            <div className="d-flex">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <a
                href="#/"
                className="ms-auto text-inverse text-decoration-none text-opacity-50">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder=""
              name="password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3">
            Sign In
          </button>
        </form>
        <div className="text-inverse text-opacity-50 text-center">
          Already have an Admin ID? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default PagesLogin;
