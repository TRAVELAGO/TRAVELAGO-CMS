import { Link, useNavigate } from "react-router-dom";
import "./cardBooking.scss";
import { format } from "date-fns";
import { updateBookingCancel } from "../../utils/api";
import { PATH_URL } from "../../utils/const/common";

function CardBooking({ item, setBooking }) {
  console.log(item);
  const navigate = useNavigate();
  const handleDelete = async () => {
    updateBookingCancel(item.id);
    // setBooking((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleUpdate = () => {
    navigate(PATH_URL.HOTEL_DETAIL.replace(":id", item.room.id));
  };

  return (
    <div className="card">
      <Link
        to={PATH_URL.HOTEL_DETAIL.replace(":id", item.room.id)}
        className="imageContainer"
      >
        <img src={item.room.images[0].url} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link
            to={PATH_URL.HOTEL_DETAIL.replace(":id", item.room.id)}
          >{`HOTEL ${item.room.hotel.name}`}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{`${item.room.hotel.address}`}</span>
        </p>
        <p className="price">{item.room.price} vnd</p>
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
