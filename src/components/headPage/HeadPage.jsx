import { Link } from "react-router-dom";

import { PATH_URL } from "../../utils/const/common";

const HeadPage = ({ title }) => {
  if (!title) return <></>;

  return (
    <div className="relative text-center py-[125px]">
      <h1 className="text-5xl font-bold leading-tight mb-3">{title}</h1>
      <ul>
        <li className="inline-block text-primary-100 text-sm font-bold leading-relaxed">
          <Link to={PATH_URL.HOME} className="text-dark-600 capitalize">
            Home
          </Link>
        </li>
        <li className="inline-block text-primary-100 text-sm font-bold leading-relaxed">
          <span className="inline-block text-dark-600 mx-2">-</span>
          <span className="capitalize">{title}</span>
        </li>
      </ul>
    </div>
  );
};

export default HeadPage;
