import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, Tooltip } from "react-leaflet";
import { Link } from "react-router-dom";

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
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span>{item.bedroom} bedroom</span>
                <b>$ {item.price}</b>
              </div>
            </div>
          </Popup>
          <Tooltip>
            <div className="popupContainer">
              <img src={item.img} alt="" />
              <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span>{item.bedroom} bedroom</span>
                <b>$ {item.price}</b>
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
