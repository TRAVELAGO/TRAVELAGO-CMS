import { format } from "date-fns";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import {
  fetchRecentList,
  fetchWishlist,
  isInWishlist,
} from "../../redux/wishlistAction";
import { createBookingOnline } from "../../utils/api";
import { MAX_RECENT_LIST, PATH_URL, ROLE } from "../../utils/const/common";
import "./hotelDetail.scss";

function HotelDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist, recentList } = useSelector((state) => state.wishlist);
  const { currentUser, error } = useSelector((state) => state.user);
  const role = currentUser.role;
  const room = useLoaderData();
  console.log(room);
  const isSave = isInWishlist(wishlist, room);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleBooking = async () => {
    try {
      console.log(format(date[0].startDate, "yyyy-MM-dd"));
      const newBooking = {
        dateFrom: format(date[0].startDate, "yyyy-MM-dd"),
        dateTo: format(date[0].endDate, "yyyy-MM-dd"),
        roomId: room.id,
      };
      const res = await createBookingOnline(newBooking);
      console.log(res.data.booking.id);
      const paymentUrl = res.data.paymentUrl;
      if (paymentUrl) {
        window.open(paymentUrl, "_blank"); // Mở một cửa sổ mới với URL được trả về từ API
      }
      navigate(PATH_URL.PROFILE_BOOKING);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    const _recent = recentList.filter(
      (value, index) => value.id !== room.id && index < MAX_RECENT_LIST
    );
    _recent.shift(room);
    dispatch(fetchRecentList(_recent));
  }, [room]);

  return (
    <div className="hotelDetail">
      <div className="details">
        <div className="wrapper">
          <Slider images={room.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{room.name}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{room.hotel.address}</span>
                </div>
                <div className="price">$ {room.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div
              className="bottom"
              style={{ lineHeight: "1.5" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(room.description),
              }}
            ></div>
            {role === ROLE.USER && (
              <div className="booking">
                <h3>Chọn ngày đặt phòng:</h3>
                <span onClick={() => setOpenDate(!openDate)} className="date">
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
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
                <button className="booking-btn" onClick={handleBooking}>
                  Booking now
                </button>
              </div>
            )}
          </div>
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
                {room.roomType.numberBedType1} {room.roomType.bedType1}
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

export default HotelDetail;
