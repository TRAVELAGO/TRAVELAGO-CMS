import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardImage from "../../components/cardImage/CardImage";
import { withLoading } from "../../redux/appAction";
import { fetchInitWishlist } from "../../redux/wishlistAction";
import "./wishlist.scss";

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
          <div className="grid gap-4 md:grid-cols-2">
            {wishlist?.map((item) => (
              <CardImage item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
