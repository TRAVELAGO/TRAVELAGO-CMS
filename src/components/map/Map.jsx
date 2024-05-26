import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { Link } from "react-router-dom";

import { PATH_URL, formatPrice } from "../../utils/const/common";
import "./map.scss";

function Map({ items }) {
  return (
    <MapContainer
      center={[21.0097, 105.80269]}
      zoom={12}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker position={[item.latitude, item.longitude]} key={item.id}>
          <Popup>
            <div className="popupContainer">
              <img src={item.img} alt="" />
              <div className="textContainer">
                <Link to={PATH_URL.ROOM_DETAIL.replace(":id", item.id)}>
                  {item.title}
                </Link>
                <span>{item.bedroom} bedroom</span>
                <b>{formatPrice(item.price)} VND</b>
              </div>
            </div>
          </Popup>
          <Tooltip>
            <div className="popupContainer">
              <img src={item.img} alt="" />
              <div className="textContainer">
                <Link to={PATH_URL.ROOM_DETAIL.replace(":id", item.id)}>
                  {item.title}
                </Link>
                <span>{item.bedroom} bedroom</span>
                <b>{formatPrice(item.price)} VND</b>:
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
