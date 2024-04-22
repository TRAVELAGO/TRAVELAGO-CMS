import "./avatar.scss";

function Avatar({ url, name, noti, width, height, color }) {
  const firstChar = name.charAt(0).toUpperCase() || "";

  return (
    <div className="avatar" style={{ width: width, height: height }}>
      {url ? (
        <img
          src={
            url ||
            "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt="Avatar"
          width={width || 40}
          height={height || 40}
          className="avatar-img"
        />
      ) : (
        <div
          className="avatar-name"
          style={{ backgroundColor: color, width: width, height: height }}
        >
          {firstChar}
        </div>
      )}
      {noti && <div className="notification">{noti}</div>}
    </div>
  );
}

export default Avatar;
