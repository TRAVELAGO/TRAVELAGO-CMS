import { useEffect, useState } from "react";

import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { listData } from "../../lib/dummydata";
import { getRoomByFilter } from "../../utils/api";
import "./hotelList.scss";

function HotelList() {
  const [room, setRoom] = useState([]);
  console.log(room);

  useEffect(() => {
    const getRoomData = async () => {
      // const res = await getRoomById("65ba0bb2-c2a3-45d8-a283-320b4c5d130c");
      const res = await getRoomByFilter();
      console.log(res.data.data);
      setRoom(res.data.data);
    };
    getRoomData();
  }, []);

  const data = room;

  return (
    <div className="hotelList">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data?.map((item) => (
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
