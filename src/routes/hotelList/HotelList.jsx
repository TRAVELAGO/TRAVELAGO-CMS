import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Card2 from "../../components/card2/Card2";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { listData } from "../../lib/dummydata";
import { withLoading } from "../../redux/appAction";
import { getAllRoomType, searchHotel } from "../../utils/api";
import { getQueryParams } from "../../utils/const/common";
import "./hotelList.scss";

const DEFAULT_ORDER = "id,ASC";
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 20;

function HotelList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [hotel, setHotel] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    guestNumber: "1",
    roomTypeId: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: "",
    areaTo: "",
    rate: "",
    roomAmenities: "",
    dateFrom: "2024-01-01",
    dateTo: "2025-01-01",
    longitude: "105.7373997",
    latitude: "21.0054762",
    maxDistance: "40",
    order: DEFAULT_ORDER,
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleSubmit = (data) => {
    setFilters(data);
    const query = getQueryParams(data);
    setSearchParams(query);
    fetchHotel(query);
  };

  const fetchHotel = (filters) => {
    dispatch(
      withLoading(async () => {
        const [hotel, roomTypes] = await Promise.all([
          searchHotel(filters),
          getAllRoomType(),
        ]);
        setHotel(hotel.data.data);
        setRoomTypes(roomTypes.data);
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
    fetchHotel(query);
  }, [filters, searchParams]);

  return (
    <div className="hotelList">
      <div className="listContainer">
        <div className="wrapper">
          <Filter
            filters={filters}
            roomTypes={roomTypes}
            onSubmit={handleSubmit}
          />
          {hotel?.map((item) => (
            <Card2 key={item.id} item={item} />
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
