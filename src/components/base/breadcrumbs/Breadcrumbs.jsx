import { Link } from "react-router-dom";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const Breadcrumbs = ({ items }) => {
  const isLastItem = (index) => {
    return index >= items.length - 1;
  };

  const renderLink = (item) => {
    if (!item.link) return <></>;
    return (
      <Link
        to={item.link}
        className="text-dark-600 text-sm font-normal leading-tight line-clamp-1 break-all hover:underline"
      >
        {item.name}
      </Link>
    );
  };

  const renderUnLink = (item) => {
    return (
      <span className="text-dark-600 text-sm font-normal leading-tight line-clamp-1 break-all">
        {item.name}
      </span>
    );
  };

  if (!items) return <></>;

  return (
    <div className="relative my-7">
      <ul className="p-0 m-0">
        {items.map((item, index) => (
          <li className="inline-flex items-center py-1" key={index}>
            {!isLastItem(index) ? (
              <>
                {item.link ? renderLink(item) : renderUnLink(item)}
                <span className="inline-block mx-2">
                  <ChevronRightOutlinedIcon
                    className="text-dark-100 text-center align-middle"
                    viewBox="-4 -4 32 32"
                  />
                </span>
              </>
            ) : (
              renderUnLink(item)
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
