import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "../../components/list/List";
import { withLoading } from "../../redux/appAction";
import { fetchInitWishlist } from "../../redux/wishlistAction";
import "./wishlist.scss";
import CardImage from "../../components/cardImage/CardImage";

function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(
      withLoading(() => {
        dispatch(fetchInitWishlist());
      })
    );
  }, []);

  return (
    <div className="wishlist">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>My Wishlist</h1>
          </div>
          <div className="border-t border-[#eee]"></div>
          {/* <List data={wishlist} /> */}
          {wishlist?.map((item) => (
            <CardImage item={item} />
          ))}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">{/* <Chat /> */}</div>
      </div>
    </div>
  );
}

export default Wishlist;
