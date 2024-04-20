import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useRoutes } from "react-router-dom";

import { fetchLogout } from "../../redux/apiCall";
import { PATH_URL } from "../../utils/const/common";
import "./navbar.scss";
import Avatar from "../base/avatar/Avatar";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    fetchLogout(dispatch);
    navigate(PATH_URL.LOGIN);
  };

  return (
    <nav>
      <div className="left">
        <Link to={PATH_URL.HOME} className="logo">
          <img src="/logo.png" alt="" width={100} height={100} />
          <span>Travelago</span>
        </Link>
        <Link to={PATH_URL.HOME}>Home</Link>
        <Link to={PATH_URL.ABOUT}>About</Link>
        <Link to={PATH_URL.CONTACT}>Contact</Link>
        <Link to={PATH_URL.HOTEL}>Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <Link to={PATH_URL.PROFILE}>
              <Avatar url={user.avatar} name={user.fullName} noti={3} />
              <span>{user.fullName}</span>
            </Link>
            <Link to={PATH_URL.PROFILE_BOOKING} className="my-booking">
              <span>My Booking</span>
            </Link>
            <Link to="" className="logout" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        ) : (
          <>
            <Link to={PATH_URL.LOGIN}>Sign in</Link>
            <Link to={PATH_URL.REGISTER} className="register-btn">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to={PATH_URL.HOME}>Home</Link>
          <Link to={PATH_URL.ABOUT}>About</Link>
          <Link to={PATH_URL.CONTACT}>Contact</Link>
          <Link to={PATH_URL.HOTEL}>Agents</Link>
          <Link to={PATH_URL.LOGIN}>Sign in</Link>
          <Link to={PATH_URL.REGISTER}>Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
