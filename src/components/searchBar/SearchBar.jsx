import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import { PATH_URL, getQueryParams } from "../../utils/const/common";
import "./searchBar.scss";

const Types = {
  Room: "Room",
  Hotel: "Hotel",
};

function SearchBar() {
  const navigate = useNavigate();
  const [queryType, setQueryType] = useState(Types.Room);
  const [query, setQuery] = useState({
    name: "",
    priceFrom: 0,
    priceTo: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setQuery((prev) => {
      if (formData.get("location")) prev.name = formData.get("location");
      if (formData.get("minPrice")) prev.priceFrom = formData.get("minPrice");
      if (formData.get("maxPrice")) prev.priceTo = formData.get("maxPrice");
      return prev;
    });

    const queryParams = getQueryParams(query);
    if (queryType === Types.Hotel)
      navigate({
        pathname: PATH_URL.HOTEL,
        search: createSearchParams({
          ...queryParams,
        }).toString(),
      });
    else {
      navigate({
        pathname: PATH_URL.ROOM,
        search: createSearchParams({
          ...queryParams,
        }).toString(),
      });
    }
  };

  const switchType = (val) => {
    setQueryType(val);
  };

  return (
    <div className="searchBar">
      <div className="type">
        {Object.values(Types).map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={queryType === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <button type="submit">
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
