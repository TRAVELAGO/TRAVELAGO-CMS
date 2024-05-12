import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Transition } from "@headlessui/react";
import { fetchForgotPassword } from "../../redux/userAction";
import { PATH_URL } from "../../utils/const/common";
import "./forgotPassword.scss";

const DELAY = 30;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Email is not valid")
    .required("Email required!"),
  code: Yup.string().label("OTP").required("OTP required!"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [delay, setDelay] = useState(0);

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
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

  const countdown = () => {
    setDelay(DELAY);
    const timer = setInterval(() => {
      setDelay((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
      });
    }, 1000);
  };

  const handleSendEmail = async () => {
    setError("");
    if (!formik.values.email || formik.errors.email) {
      setError(formik.errors.email || "Email required!");
      return;
    }
    try {
      const _payload = { email: formik.values.email };
      await fetchSendEmail(dispatch, _payload);
      setIsSendOtp(true);
      countdown();
    } catch (error) {
      setError(error.message);
    }
  };

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
          <form>
            {error && <p className="error-message">{error}</p>}
            <div className="flex flex-col gap-[30px] bg-white z-[1]">
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
              <button
                type="button"
                onClick={handleSendEmail}
                className="disabled:pointer-events-none"
                disabled={!!delay}
              >
                {delay || (isSendOtp ? "Resend OTP" : "Send OTP")}
              </button>
            </div>

            <Transition
              show={isSendOtp}
              enter="transition duration-300"
              enterFrom="opacity-0 -translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-full"
              className="flex flex-col gap-[30px] z-0"
            >
              <label htmlFor="code">
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Enter OTP"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                />
                {formik.errors?.code && formik.touched.code && (
                  <p className="error-message">{formik.errors?.code}</p>
                )}
              </label>
              <button type="button" onClick={formik.handleSubmit}>
                Submit
              </button>
            </Transition>
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
