import "./bookingDetail.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { createBookingOnline, getBookingById } from "../../utils/api";
import { useSelector } from "react-redux";
import { makeRequest } from "../../utils/axios";

function BookingDetail() {
  const { currentUser, error } = useSelector((state) => state.user);
  const role = currentUser.user.role;
  const location = useLocation();
  const navigate = useNavigate();

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [booking, setBooking] = useState();

  const bookingId = location.pathname.split("/")[2];
  console.log(bookingId);
  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = currentUser.accessToken;
        makeRequest.defaults.headers.common = {
          Authorization: `bearer ${accessToken}`,
        };
        const res = await getBookingById(bookingId);
        setBooking(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [bookingId]);
  let status = 0;
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
                  <span>Hotel: {booking?.room.hotel.address}</span>
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
            {role === "USER" && (
              <div className="booking">
                <h3>Ngày đã chọn đặt phòng:</h3>
                <span className="date">
                  {`${format(booking?.dateFrom, "MM/dd/yyyy")} to ${format(
                    booking?.dateTo,
                    "MM/dd/yyyy"
                  )}`}
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
                  <button className="booking-btn">Thanh toán</button>
                ) : booking?.status === 3 ? (
                  <button className="booking-btn success">
                    Đã thanh toán thành công
                  </button>
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
            <button>
              <img src="/save.png" alt="" />
              Lưu địa điểm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
