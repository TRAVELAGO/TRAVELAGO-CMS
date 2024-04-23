import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "../../base/loading/Loading";
import Navbar from "../../navbar/Navbar";
import "./layout.scss";

function Layout() {
  const { isFetching } = useSelector((state) => state.app);

  return (
    <div className="layout">
      {isFetching && <Loading />}
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
