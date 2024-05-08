import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { fetchLogin } from "../../redux/userAction";
import { PATH_URL } from "../../utils/const/common";
import { passwordRegex } from "../../utils/const/regex";
import "./login.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Email is not valid")
    .required("Email required!"),
  password: Yup.string()
    .label("Password")
    .min(8, "Password minimum 8 characters")
    .matches(passwordRegex, "Password minimum 8 characters")
    .required("Password required!"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isFetching } = useSelector((state) => state.user);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      try {
        await fetchLogin(dispatch, values);
        navigate(PATH_URL.CHOOSE_HOTEL);
      } catch (error) {
        setError(error.message);
      }
    },
  });

  useEffect(() => {
    if (currentUser) {
      navigate(PATH_URL.HOME);
    }
  }, [currentUser]);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Find your hotel right now</p>
          <span>{`Don't you have an account?`}</span>
          <Link to={PATH_URL.REGISTER}>
            <button>Register</button>
          </Link>
          <span>{`Become a host?`}</span>
          <Link to={PATH_URL.HOTEL_REGISTER}>
            <button>Register as hotel</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="email">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors?.email && formik.touched.email && (
                <p className="error-message">{formik.errors?.email}</p>
              )}
            </label>
            <label htmlFor="password">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors?.password && formik.touched.password && (
                <p className="error-message">{formik.errors?.password}</p>
              )}
            </label>
            <Link to={PATH_URL.FORGOT_PASSWORD}>Forgot your password?</Link>
            <button type="submit" onClick={formik.handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
