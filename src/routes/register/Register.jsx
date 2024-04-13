import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    fullName: "",
    role: "USER",
    hotelName: "test",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputs.email && inputs.fullName && inputs.password) {
      try {
        const res = await makeRequest.post("auth/register", inputs);
        console.log(res);
        navigate("/login");
      } catch (error) {
        setErr(error.response.data.message[0]);
      }
    } else {
      setErr("Please fill all fields!");
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <input
              type="password"
              placeholder="PasswordConfirm"
              onChange={handleChange}
              name="passwordConfirm"
            />

            <input
              type="text"
              placeholder="FullName"
              onChange={handleChange}
              name="fullName"
            />

            <input
              type="text"
              placeholder="Phone Number"
              onChange={handleChange}
              name="phoneNumber"
            />
            {err && <p>{err}</p>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Hello World.</h1>
          <p>Let find your dream place</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
