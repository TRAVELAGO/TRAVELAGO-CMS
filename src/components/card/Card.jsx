import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchWishlist, isInWishlist } from "../../redux/wishlistAction";
import { PATH_URL } from "../../utils/const/common";
import "./card.scss";

function Card({ item }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isSave = isInWishlist(wishlist, item);

  const handleClickSave = () => {
    const existItem = wishlist.find((value) => value.id === item.id);
    if (existItem) {
      const _wishlist = wishlist.filter((value) => value.id !== item.id);
      dispatch(fetchWishlist(_wishlist));
    } else {
      const _wishlist = [...wishlist, item];
      dispatch(fetchWishlist(_wishlist));
    }
  };

  if (!item) return <></>;

  return (
    <div className="card">
      <Link
        to={PATH_URL.HOTEL_DETAIL.replace(":id", item.id)}
        className="imageContainer"
      >
        {item.images?.length && <img src={item.images[0]?.url} alt="" />}
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={PATH_URL.HOTEL_DETAIL.replace(":id", item.id)}>
            {item.name}
          </Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.hotel?.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <button
              className={isSave ? "icon active" : "icon"}
              onClick={handleClickSave}
            >
              <img src="/save.png" alt="" />
            </button>
            {/* <button className="icon">
              <img src="/chat.png" alt="" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
