import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import { fetchWishlist } from "../../redux/wishlistAction";
import { getBookingById } from "../../utils/api";
import { ROLE } from "../../utils/const/common";
import "./bookingDetail.scss";

function BookingDetail() {
  const { currentUser, error } = useSelector((state) => state.user);
  const role = currentUser.role;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [booking, setBooking] = useState();
  const paymentUrl =
    "https://sandbox.vnpayment.vn/paymentv2/Transaction/PaymentMethod.html?token=7877504f8d8747109d9eb0765d7647b0";
  const bookingId = location.pathname.split("/")[2];
  console.log(bookingId);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBookingById(bookingId);
        setBooking(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [bookingId]);
  let status = 0;
  console.log(booking?.status);
  switch (booking?.status) {
    case 0:
      status = "Chưa thanh toán";
      break;
    case 3:
      status = "Đã thanh toán";
      break;
    case 4:
      status = "Đã hủy";
      break;
    default:
      break;
  }

  const handleClickSave = () => {
    const existItem = wishlist.find((value) => value.id === room.id);
    if (existItem) {
      const _wishlist = wishlist.filter((value) => value.id !== room.id);
      dispatch(fetchWishlist(_wishlist));
    } else {
      const _wishlist = [...wishlist, room];
      dispatch(fetchWishlist(_wishlist));
    }
  };

  const handlePayment = () => {
    window.open(paymentUrl, "_blank");
  };

  return (
    <div className="bookingDetail">
      <div className="details">
        <div className="wrapper">
          <div className="info">
            <div className="top">
              <div className="post">
                <h2>ID: {booking?.id}</h2>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>Hotel: {booking?.room.hotel.name}</span>
                </div>
                <div className="address">
                  <img src="/bed.png" alt="" />
                  <span>
                    Room: {booking?.room.roomType.numberBedType1}{" "}
                    {booking?.room.roomType.bedType1}
                  </span>
                </div>
                <div className="price">
                  Tổng thanh toán: {booking?.room.price} vnd
                </div>
                <div className="price">Trạng thái: {status}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            {/* <div
              className="bottom"
              style={{ lineHeight: "1.5" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(room.description),
              }}
            ></div> */}
            {role === ROLE.USER && (
              <div className="booking">
                <h3>Ngày đã chọn đặt phòng:</h3>
                <span className="date">
                  {booking &&
                    `${format(booking?.dateFrom, "dd/MM/yyyy")} to ${format(
                      booking?.dateTo,
                      "dd/MM/yyyy"
                    )}`}
                  {/* {`${booking?.dateFrom} to ${booking?.dateTo}`} */}
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date-calendar"
                      minDate={new Date()}
                    />
                  )}
                </span>
                {booking?.status === 0 ? (
                  <button className="booking-btn" onClick={handlePayment}>
                    Thanh toán
                  </button>
                ) : booking?.status === 3 ? (
                  <button className="booking-btn success">Đã thanh toán</button>
                ) : (
                  booking?.status === 4 && (
                    <button className="booking-btn cancel">Đã hủy</button>
                  )
                )}
              </div>
            )}
          </div>
          <h3>Preview Phòng</h3>
          {booking && <Slider images={booking?.room?.images} />}
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Tiện ích</span>
                <p>Đầy đủ tiện ích</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Chính sách thú cưng</span>
                <p>Cho phép mang thú cưng vào</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Dịch vụ</span>
                <p>Nhiều dịch vụ miễn phí chất lượng</p>
              </div>
            </div>
          </div>
          <p className="title">Diện tích</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>80 mét vuông</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>
                {booking?.room.roomType.numberBedType1}{" "}
                {booking?.room.roomType.bedType1}
              </span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>1 phòng tắm</span>
            </div>
          </div>
          <p className="title">Khu vực lân cận</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>Trường học</span>
                <p>250m</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bến xe buýt</span>
                <p>100m</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Nhà hàng</span>
                <p>200m</p>
              </div>
            </div>
          </div>
          <p className="title">Vị trí</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Nhắn tin
            </button>
            <button
              className={isSave ? "save-btn active" : "save-btn"}
              onClick={handleClickSave}
            >
              <img src="/save.png" alt="" />
              {isSave ? "Bỏ lưu địa điểm" : "Lưu địa điểm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
