import { Link } from "react-router-dom";

import { PATH_URL } from "../../utils/const/common";
import "./footer.scss";

function FooterTemplate1() {
  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <div className="footer-widget-lg">
          <Link to={PATH_URL.HOME} className="widget-logo">
            <img src="/logo.png" alt="" width={100} height={100} />
            <span>Travelago</span>
          </Link>
          <p>
            Nunc at lacus at nibh scelerisque scelerisque id vel metus. Vivamus
            mollis diam maximus, consequat nulla sit amet, ultricies quam. Proin
          </p>
          <ul className="widget-social">
            <li>
              <Link to="#">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="icons"
                />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/x.svg" alt="X" className="icons" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="icons"
                />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/youtube.svg" alt="Youtube" className="icons" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-widget-sm">
          <h3>Pages Links</h3>
          <ul className="widget-menu">
            <li>
              <Link to={PATH_URL.HOME}>Home</Link>
            </li>
            <li>
              <Link to={PATH_URL.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={PATH_URL.CONTACT}>Contact</Link>
            </li>
            <li>
              <Link to={PATH_URL.HOTEL}>Agents</Link>
            </li>
          </ul>
        </div>
        <div className="footer-widget-sm">
          <h3>Recent Post</h3>
          <ul className="widget-menu">
            <li>
              <Link to={PATH_URL.HOME}>Home</Link>
            </li>
            <li>
              <Link to={PATH_URL.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={PATH_URL.CONTACT}>Contact</Link>
            </li>
            <li>
              <Link to={PATH_URL.HOTEL}>Agents</Link>
            </li>
          </ul>
        </div>
        <div className="footer-widget-lg">
          <h3>Opening Hours</h3>
          <div className="widget-hours">
            <p>
              Sun<span>7 : 00 AM - 2 : 00 PM</span>
            </p>
            <p>
              Mon<span>9 : 00 AM - 4 : 00 PM</span>
            </p>
            <p>
              Tue<span>6 : 00 AM - 1 : 00 PM</span>
            </p>
            <p>
              Wed<span>8 : 00 AM - 3 : 00 PM</span>
            </p>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-title">
          <p>
            {"Copyright © 2024 "}
            <Link to="https://github.com/TRAVELAGO">TRAVELAGO</Link>{" "}
            {"Website by "}
            <Link to="https://www.facebook.com/100065533927607/">Bang, </Link>
            <Link to="https://www.facebook.com/100013170812020/">Dung, </Link>
            <Link to="https://www.facebook.com/minhduc.mll">Duc, </Link>
            <Link to="https://www.facebook.com/100008761207203/">Hoang, </Link>
            <Link to="https://www.facebook.com/100009586633233/">Hung.</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterTemplate1;
