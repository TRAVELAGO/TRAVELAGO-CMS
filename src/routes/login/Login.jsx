import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCall";
import { loginFailure } from "../../redux/userRedux";

const Login = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.email && inputs.password) {
      try {
        await login(dispatch, inputs);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(loginFailure("Please enter a email and password"));
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Find your hotel right now</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
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
            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
