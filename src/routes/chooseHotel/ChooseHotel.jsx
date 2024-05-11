import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectHotel } from "../../redux/hotelAction";
import { createHotel } from "../../utils/api";
import { PATH_URL } from "../../utils/const/common";
import "./chooseHotel.scss";

import CloseIcon from "@mui/icons-material/Close";

const ChooseHotel = () => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  const { hotel: hotelList } = useSelector((state) => state.user);
  console.log(hotelList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const mapRef = useRef(null);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     mapRef.current.addEventListener("click", handleMapClick);
  //   }
  //   return () => {
  //     if (mapRef.current) {
  //       mapRef.current.removeEventListener("click", handleMapClick);
  //     }
  //   };
  // }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const formData = new FormData();
      // images.forEach((image) => {
      //   formData.append("images", image);
      // });
      formData.append("name", inputs.name);
      formData.append("address", inputs.address);
      formData.append("latitude", position.lat);
      formData.append("longitude", position.lng);
      formData.append("checkInTime", "14:00:00");
      formData.append("checkOutTime", "12:00:00");
      await createHotel(formData);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChooseLocation = (e) => {
    e.preventDefault();
    const map = mapRef.current;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
          if (map) {
            map.setView([latitude, longitude], map.getZoom());
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div className="chooseHotel">
      <Link
        to={PATH_URL.HOME}
        className="absolute top-4 right-4 hover:scale-110"
      >
        <CloseIcon className="text-white" />
      </Link>
      <div className="list">
        {hotelList.map((i) => (
          <div className="card" key={i.id} onClick={() => handleChooseHotel(i)}>
            <img src="/bed.png" alt="" />
            {i.name}
          </div>
        ))}
      </div>
      <div className="new" onClick={() => setOpen(true)}>
        Tạo khách sạn mới
      </div>
      {open && (
        <div className="container-full">
          <div className="temporary" ref={modalRef}>
            {/* <Close onClick={() => setOpen(false)} /> */}
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" />
              </div>
              <div className="item">
                Chọn vị trí của bạn trên bản đồ hoặc
                <button className="now-location" onClick={handleChooseLocation}>
                  Chọn vị trí hiện tại của bạn
                </button>
              </div>
              <button className="create" type="submit">
                Tạo khách sạn mới
              </button>
            </form>
            <MapContainer
              center={[21.0285, 105.8542]}
              zoom={12}
              style={{ height: "100%", width: "100%", flex: "1" }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseHotel;

function LocationMarker({ position, setPosition }) {
  // const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      map.locate();
      setPosition(e.latlng);
    },
    // locationfound(e) {
    //   setPosition(e.latlng);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
  });
  console.log(position);
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
