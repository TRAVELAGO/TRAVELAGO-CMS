import { makeRequest } from "../../axios";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";

function ProfilePage() {
  const handleCreateRoom = async () => {
    const res = await makeRequest.post("room-types", {
      bedType1: "giường to",
      numberBedType1: 3,
      guestNumber: 7,
      description: "hihi",
    });
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
          <div className="title">
            <h1>My List</h1>
            <button onClick={handleCreateRoom}>Create New Room</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
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
