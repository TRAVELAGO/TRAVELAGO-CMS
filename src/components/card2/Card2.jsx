import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchWishlist, isInWishlist } from "../../redux/wishlistAction";
import { PATH_URL, formatPrice } from "../../utils/const/common";

import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";

function Card2({ item }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isSave = isInWishlist(wishlist, item);

  const getTargetUrl = () => {
    return PATH_URL.ROOM_DETAIL.replace(":id", item.id);
  };

  const getNumberOfBeds = () => {
    return item.roomType?.numberBedType1 + item.roomType?.numberBedType2 || 1;
  };

  const getNumberOfGuests = () => {
    return item.roomType?.guestNumber || 1;
  };

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
    <div className="relative block md:flex items-center border border-gray-200 p-0">
      {item.images?.length && (
        <Link
          to={getTargetUrl()}
          className="relative w-full md:w-[200px] xl:w-[300px] overflow-hidden"
        >
          <img
            src={item.images[0]?.url}
            alt="Main Image"
            className="w-full aspect-[5/4] object-cover transition-transform hover:scale-125"
          />
        </Link>
      )}
      <div className="block md:flex w-full items-center justify-between px-5 pt-6 pb-[30px] md:py-0 xl:px-[50px]">
        <div className="grow md:border-r border-gray-200 pr-0 md:pr-5 xl:pr-[50px]">
          <h2 className="text-2xl font-medium leading-normal mb-2 md:mb-0 hover:text-primary-100 transition-colors">
            <Link to={getTargetUrl()}>{item.name}</Link>
          </h2>
          {item.description && (
            <div className="max-w-[330px] text-dark-100 mb-2 md:mb-4 line-clamp-2">
              <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
            </div>
          )}
          <p className="inline-flex items-center text-dark-100 mb-2 md:mb-4">
            <PlaceOutlinedIcon className="text-primary-100" />
            <span>{item.hotel?.address}</span>
          </p>
          <ul className="space-x-6">
            <li className="inline-flex items-center space-x-1">
              <BedOutlinedIcon className="text-primary-100" />
              <span>{`(${getNumberOfBeds()}) bed's`}</span>
            </li>
            <li className="inline-flex items-center space-x-1">
              <GroupsOutlinedIcon className="text-primary-100" />
              <span>{`(${getNumberOfGuests()}) Guest's`}</span>
            </li>
          </ul>
        </div>
        <div className="shrink-0 text-left md:text-center md:mx-5 xl:mr-0">
          <div className="flex md:flex-col items-center space-x-6 my-2.5 md:space-x-0 md:my-0">
            <p className="text-sm font-bold leading-6">
              <span className="text-primary-100">
                {formatPrice(item.price)} VND
              </span>
              /Night
            </p>
            <p className="inline-flex items-center leading-6">
              <StarOutlinedIcon className="text-primary-100" />
              {item.rate}
            </p>
          </div>
          <Link
            to={getTargetUrl()}
            className="inline-flex items-center space-x-1 transition-all hover:text-primary-100"
          >
            <KeyboardArrowRightOutlinedIcon className="text-primary-100" />
            <span className="text-sm font-bold leading-6 uppercase">
              READ MORE
            </span>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2">
        <button
          onClick={handleClickSave}
          className="transition-transform hover:scale-110"
        >
          {isSave ? (
            <TurnedInOutlinedIcon className="text-primary-100" />
          ) : (
            <TurnedInNotOutlinedIcon />
          )}
        </button>
        {/* <button className="icon">
          <img src="/chat.png" alt="" />
        </button> */}
      </div>
    </div>
  );
}

export default Card2;
