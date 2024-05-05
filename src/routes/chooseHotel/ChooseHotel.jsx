import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectHotel } from "../../redux/hotelAction";
import "./chooseHotel.scss";

const ChooseHotel = () => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  const { hotel: hotelList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.addEventListener("click", handleMapClick);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener("click", handleMapClick);
      }
    };
  }, []);
  console.log(position);
  const handleMapClick = (e) => {
    setPosition(e.latlng);
  };
  const modalRef = useRef(null);
  const handleChooseHotel = (i) => {
    console.log(i);
    selectHotel(dispatch, i);
    navigate("/");
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="chooseHotel">
      <div className="list">
        {hotelList.map((i) => (
          <div className="card" key={i.id} onClick={() => handleChooseHotel(i)}>
            <img src="/bed.png" alt="" />
            {i.name}
          </div>
        ))}
      </div>
      <div className="new" onClick={toggleMap}>
        Tạo khách sạn mới
      </div>
      {open && (
        <div className="container-full">
          <div className="temporary" ref={modalRef}>
            {/* <Close onClick={() => setOpen(false)} /> */}
            <img
              src={
                "https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-nhung-hinh-nen-dien-thoai-galaxy-dep-chat-luong-nhat_2.jpg"
              }
              alt=""
            />
          </div>
        </div>
      )}
      {showMap && (
        <MapContainer
          center={[21.0285, 105.8542]}
          zoom={12}
          style={{ height: "400px", width: "400px" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {position && (
            <Marker position={position}>
              <Popup>
                Vĩ độ: {position.lat.toFixed(4)}, Kinh độ:{" "}
                {position.lng.toFixed(4)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default ChooseHotel;
