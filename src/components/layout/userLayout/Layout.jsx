import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "../../base/loading/Loading";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer_v2/Footer";
import "./layout.scss";

function Layout() {
  const { isFetching } = useSelector((state) => state.app);

  return (
    <div>
      <div className="navbar_bg">
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <div className="content_bg">
        <div className="content">
          <Outlet />
        </div>
      </div>
      <div className="footer_bg">
        <div className="footer">
          <Footer />
        </div>
      </div>
      {isFetching && <Loading />}
    </div>
  );
}

export default Layout;
