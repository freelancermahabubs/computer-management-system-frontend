import React, {useEffect, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {AppSettings} from "../../config/app-settings.js";
import {useRegisterMutation} from "../../redux/api/auth/register/registerApi.js";

function Register() {
  const navigate = useNavigate();
  const context = useContext(AppSettings);
  const [register] = useRegisterMutation();
  const [selectedRole, setSelectedRole] = useState("buyer");

  useEffect(() => {
    context?.setAppHeaderNone(true);
    context?.setAppSidebarNone(true);
    context?.setAppContentClass("p-0");

    return function cleanUp() {
      context?.setAppHeaderNone(false);
      context?.setAppSidebarNone(false);
      context?.setAppContentClass("");
    };
  }, [context]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event?.target?.username.value;
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    const name = event?.target?.name?.value;

    const role = selectedRole;

    try {
      const userInfo = {
        username,
        password,
        email,
        role,
        name,
      };

      const res = await register(userInfo);
      toast.success(res?.data?.message);
      return navigate("/login");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="register">
      <div className="register-content">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up</h1>
          <p className="text-inverse text-opacity-50 text-center">
            One Admin ID is all you need to access all the Admin services.
          </p>
          <div className="mb-3">
            <label className="form-label">
            Name
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder="e.g Mahabub Alom"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              userName
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder="e.g smit"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder="username@address.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg bg-white bg-opacity-5"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Role <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-outline-theme btn-lg d-block w-100">
              Sign Up
            </button>
          </div>
          <div className="text-inverse text-opacity-50 text-center">
            Already have an Admin ID? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
