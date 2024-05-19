import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Card2 from "../../components/card2/Card2";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { listData } from "../../lib/dummydata";
import { withLoading } from "../../redux/appAction";
import { getAllRoomType, getRoomByFilter } from "../../utils/api";
import { getQueryParams } from "../../utils/const/common";
import "./roomList.scss";

const DEFAULT_ORDER = "id,ASC";
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 20;

function RoomList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [room, setRoom] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    guestNumber: "",
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
        const [room, roomTypes] = await Promise.all([
          getRoomByFilter(filters),
          getAllRoomType(),
        ]);
        setRoom(room.data.data);
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
    fetchRoom(query);
  }, [filters, searchParams]);

  return (
    <div className="roomList">
      <div className="listContainer">
        <div className="wrapper">
          <Filter
            filters={filters}
            roomTypes={roomTypes}
            onSubmit={handleSubmit}
          />
          {room?.map((item) => (
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

export default RoomList;
