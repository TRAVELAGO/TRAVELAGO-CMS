import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Chat from "../../components/chat/Chat";
import FormProfile from "../../components/FormProfile/FormProfile";
import { PATH_URL } from "../../utils/const/common";
import "./profile.scss";

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <><div style={{ height: '64px' }}></div>
    <FormProfile userData={currentUser} />
    </>
    //   <div className="chatContainer">
    //     <div className="wrapper">
    //       <Chat />
    //     </div>
    //   </div>
    // </div>
  );
}

export default Profile;
