import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchLogout } from "../../redux/userAction";
import { PATH_URL, ROLE, TRAVELAGO } from "../../utils/const/common";
import Avatar from "../base/avatar/Avatar";
import Menu from "../base/menu/Menu";
import "./navbar.scss";

import BedOutlinedIcon from "@mui/icons-material/BedOutlined";

const USER_PROFILE_MENU = [
  {
    name: "Profile",
    link: PATH_URL.PROFILE,
  },
  {
    name: "My Booking",
    link: PATH_URL.PROFILE_BOOKING,
  },
  {
    name: "Wishlist",
    link: PATH_URL.WISHLIST,
  },
];

const HOTEL_PROFILE_MENU = [
  {
    name: "Profile",
    link: PATH_URL.PROFILE,
  },
  {
    name: "My List Room",
    link: PATH_URL.PROFILE_BOOKING,
  },
  {
    name: "Wishlist",
    link: PATH_URL.WISHLIST,
  },
];

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const { currentHotel } = useSelector((state) => state.hotel);
  const [open, setOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const profileMenu =
    user?.role === ROLE.USER ? USER_PROFILE_MENU : HOTEL_PROFILE_MENU;

  const handleOpenMenu = () => {
    setOpenProfileMenu(true);
  };

  const handleLogout = () => {
    fetchLogout(dispatch);
    navigate(PATH_URL.LOGIN);
  };

  return (
    <nav className="navbar-wrapper">
      <div className="left">
        <Link to={PATH_URL.HOME} className="logo">
          <img src="/logo.png" alt="" width={64} height={64} />
          <span>{TRAVELAGO}</span>
        </Link>
        <Link to={PATH_URL.HOME}>Trang chủ</Link>
        <Link to={PATH_URL.ABOUT}>Về chúng tôi</Link>
        <Link to={PATH_URL.CONTACT}>Liên hệ chúng tôi</Link>
        <Link to={PATH_URL.HOTEL}>Khách sạn</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user h-full">
            <div className="relative flex items-center h-full">
              {currentHotel && (
                <Link className="hotel mr-2" to={PATH_URL.CHOOSE_HOTEL}>
                  <BedOutlinedIcon className="text-white" />
                  <span>{currentHotel.name}</span>
                </Link>
              )}
              <div className="cursor-pointer" onClick={handleOpenMenu}>
                <Avatar url={user.avatar} name={user.fullName} noti={3} />
                <span>{user.fullName}</span>
              </div>
              <Menu
                isOpen={openProfileMenu}
                onClose={() => setOpenProfileMenu(false)}
              >
                <ul>
                  {profileMenu.map((menu) => (
                    <li
                      key={menu.name}
                      className="relative block hover:border-l-2 hover:border-primary-100"
                      onClick={() => setOpenProfileMenu(false)}
                    >
                      <Link
                        to={menu.link}
                        className="inline-block w-full text-dark-1300 border-b border-dark-500 px-5 py-3 hover:text-primary-100 hover:pl-6"
                      >
                        <span className="text-base font-bold capitalize">
                          {menu.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li
                    key={"Logout"}
                    className="relative block hover:border-l-2 hover:border-primary-100"
                  >
                    <Link
                      className="inline-block w-full text-dark-1300 px-5 py-3 hover:text-primary-100 hover:pl-6"
                      onClick={handleLogout}
                    >
                      <span className="text-base font-bold capitalize">
                        Logout
                      </span>
                    </Link>
                  </li>
                </ul>
              </Menu>
            </div>
          </div>
        ) : (
          <div className="auth">
            <Link to={PATH_URL.HOTEL_REGISTER} className="host-btn">
              Become a Hosts
            </Link>
            <Link to={PATH_URL.LOGIN} className="login-btn">
              Sign in
            </Link>
            <Link to={PATH_URL.REGISTER} className="register-btn">
              Sign up
            </Link>
          </div>
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
          {!user && (
            <>
              <Link to={PATH_URL.HOTEL_REGISTER}>Become a Hosts</Link>
              <Link to={PATH_URL.LOGIN}>Sign in</Link>
              <Link to={PATH_URL.REGISTER}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
