import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { fetchForgotPassword } from "../../redux/apiCall";
import { PATH_URL, passwordRegex } from "../../utils/const/common";
import "./forgotPassword.scss";

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
  passwordConfirm: Yup.string()
    .label("Confirm password")
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Confirm password required!"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      try {
        await fetchForgotPassword(dispatch, values);
        navigate(PATH_URL.LOGIN);
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
    <div className="fotgot-password">
      <div className="card">
        <div className="left">
          <h1>Forgot Password</h1>
          <form onSubmit={formik.handleSubmit}>
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
            <label htmlFor="passwordConfirm">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Confirm password"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
              />
              {formik.errors?.passwordConfirm &&
                formik.touched.passwordConfirm && (
                  <p className="error-message">
                    {formik.errors?.passwordConfirm}
                  </p>
                )}
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="right">
          <h1>Hello World.</h1>
          <p>Let find your dream place</p>
          <span>Do you have an account?</span>
          <Link to={PATH_URL.LOGIN}>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
