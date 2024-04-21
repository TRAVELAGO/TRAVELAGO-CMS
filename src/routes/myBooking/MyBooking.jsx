import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import ListBooking from "../../components/listBooking/ListBooking";
import { getBooking } from "../../utils/api";
import { PATH_URL, ROLE } from "../../utils/const/common";
import "./myBooking.scss";

function MyBooking() {
  const navigate = useNavigate();
  const room = useLoaderData();
  const { currentUser } = useSelector((state) => state.user);

  const [booking, setBooking] = useState([]);
  const role = currentUser.role;
  const data = [room, room];

  useEffect(() => {
    const getData = async () => {
      if (role === ROLE.USER) {
        const res = await getBooking();
        console.log(res.data);
        setBooking(res.data.data);
      }
    };
    getData();
  }, []);

  const handleCreateRoom = async () => {
    navigate(PATH_URL.HOTEL_NEW);
  };

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
              <List data={data} />
              <div className="title">
                <h1>Saved List</h1>
              </div>
              <List data={data} />
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
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
