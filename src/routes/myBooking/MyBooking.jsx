import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import List from "../../components/list/List";
import ListBooking from "../../components/listBooking/ListBooking";
import { withLoading } from "../../redux/appAction";
import { getBooking, getRoomByHotelId } from "../../utils/api";
import { PATH_URL, ROLE } from "../../utils/const/common";
import "./myBooking.scss";

function MyBooking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentHotel } = useSelector((state) => state.hotel);

  const [booking, setBooking] = useState([]);
  const [room, setRoom] = useState([]);
  const role = currentUser.role;

  const handleCreateRoom = async () => {
    navigate(PATH_URL.HOTEL_NEW);
  };

  useEffect(() => {
    if (role === ROLE.HOTEL && !currentHotel) {
      navigate(PATH_URL.CHOOSE_HOTEL);
      return;
    }

    dispatch(
      withLoading(async () => {
        if (role === ROLE.USER) {
          const res = await getBooking();
          setBooking(res.data.data);
        } else {
          const res = await getRoomByHotelId(currentHotel.id);
          setRoom(res.data.data);
        }
      })
    );
  }, []);

  return (
    <div className="myBookking">
      <div className="details">
        <div className="wrapper">
          {role === ROLE.HOTEL ? (
            <>
              <div className="title">
                <h1>My List</h1>
                <button onClick={handleCreateRoom}>Create New Room</button>
              </div>
              <List data={room} />
            </>
          ) : (
            <>
              <div className="title">
                <h1>My Booking List</h1>
              </div>
              <ListBooking data={booking} setBooking={setBooking} />
            </>
          )}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">{/* <Chat /> */}</div>
      </div>
    </div>
  );
}

export default MyBooking;
