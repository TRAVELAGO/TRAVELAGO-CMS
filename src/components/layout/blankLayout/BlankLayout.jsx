import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Loading from "../../base/loading/Loading";
import "./blankLayout.scss";

function BlankLayout() {
  const { isFetching: userFetching } = useSelector((state) => state.user);
  const { isFetching: appFetching } = useSelector((state) => state.app);

  return (
    <div className="blank-layout">
      {(userFetching || appFetching) && <Loading />}
      <Outlet />
    </div>
  );
}

export default BlankLayout;
