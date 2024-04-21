import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "../../components/base/avatar/Avatar";
import Chat from "../../components/chat/Chat";
import { PATH_URL } from "../../utils/const/common";
import "./profile.scss";

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdateProfile = async () => {
    navigate(PATH_URL.PROFILE_UPDATE);
  };

  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <Avatar
                url={currentUser.avatar}
                name={currentUser.fullName}
                width={60}
                height={60}
              />
            </span>
            <span>
              Username: <b>{currentUser.fullName}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <span>
              Phone: <b>{currentUser.phoneNumber}</b>
            </span>
          </div>
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

export default Profile;
