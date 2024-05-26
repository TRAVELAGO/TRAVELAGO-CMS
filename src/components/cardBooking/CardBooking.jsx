import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { updateBookingCancel } from "../../utils/api";
import { PATH_URL, formatPrice } from "../../utils/const/common";
import "./cardBooking.scss";

function CardBooking({ item, setBooking }) {
  console.log(item);
  const navigate = useNavigate();
  const handleDelete = async () => {
    updateBookingCancel(item.id);
    setBooking((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleUpdate = () => {
    navigate(PATH_URL.BOOKING_DETAIL.replace(":id", item.id));
  };

  return (
    <div className="card">
      <Link
        to={PATH_URL.ROOM_DETAIL.replace(":id", item.room.id)}
        className="imageContainer"
      >
        <img src={item.room.images[0].url} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link
            to={PATH_URL.ROOM_DETAIL.replace(":id", item.room.id)}
          >{`HOTEL ${item.room.hotel.name}`}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{`${item.room.hotel.address}`}</span>
        </p>
        <p className="price">{formatPrice(item.room.price)} VND</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <span>{`Start:   ${format(item.dateFrom, "MM/dd/yyyy")}`}</span>
            </div>
            <div className="feature">
              <span>{`End:   ${format(item.dateTo, "MM/dd/yyyy")}`}</span>
            </div>
          </div>
        </div>
        <div className="icons">
          <div className="icon update" onClick={handleUpdate}>
            Detail
          </div>
          <div className="icon cancel" onClick={handleDelete}>
            {item.status !== 4 ? "Hủy" : "Đã Hủy"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBooking;
