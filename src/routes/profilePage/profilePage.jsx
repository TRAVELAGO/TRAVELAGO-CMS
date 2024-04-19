import { useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { makeRequest } from "../../utils/axios";
import "./profilePage.scss";
import { useSelector } from "react-redux";
import ListBooking from "../../components/listBooking/ListBooking";
import { useEffect, useState } from "react";
import { getBooking } from "../../utils/api";

function ProfilePage() {
  const { currentUser, error } = useSelector((state) => state.user);
  const role = currentUser.user.role;
  const navigate = useNavigate();
  const room = useLoaderData();
  const data = [room, room];
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if (role === "USER") {
        const accessToken = currentUser.accessToken;
        makeRequest.defaults.headers.common = {
          Authorization: `bearer ${accessToken}`,
        };

        const res = await getBooking();
        console.log(res.data);
        setBooking(res.data.data);
      }
    };
    getData();
  }, []);
  console.log(booking);
  const handleCreateRoom = async () => {
    navigate("/newPost");
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
          </div>
          {role === "HOTEL" ? (
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

export default ProfilePage;
