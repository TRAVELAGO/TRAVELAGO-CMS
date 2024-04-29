import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { listData } from "../../lib/dummydata";
import { withLoading } from "../../redux/appAction";
import { getRoomByFilter } from "../../utils/api";
import { getQueryParams } from "../../utils/const/common";
import "./hotelList.scss";

const DEFAULT_ORDER = "id,ASC";
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 20;

function HotelList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [room, setRoom] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    total: "",
    roomTypeId: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: "",
    areaTo: "",
    rate: "",
    roomAmenities: "",
    order: DEFAULT_ORDER,
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleSubmit = (data) => {
    setFilters(data);
    const query = getQueryParams(data);
    setSearchParams(query);
    fetchRoom(query);
  };

  const fetchRoom = (filters) => {
    dispatch(
      withLoading(async () => {
        const res = await getRoomByFilter(filters);
        setRoom(res.data.data);
      })
    );
  };

  useEffect(() => {
    searchParams.forEach((value, key) => {
      setFilters((prev) => {
        prev[key] = value;
        return prev;
      });
    });

    const query = getQueryParams(filters);
    fetchRoom(query);
  }, []);

  return (
    <div className="hotelList">
      <div className="listContainer">
        <div className="wrapper">
          <Filter filters={filters} onSubmit={handleSubmit} />
          {room?.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={listData} />
      </div>
    </div>
  );
}

export default HotelList;
