import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchWishlist, isInWishlist } from "../../redux/wishlistAction";
import { PATH_URL } from "../../utils/const/common";

import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import { Transition } from "@headlessui/react";
import { useState } from "react";

function CardImage({ item }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(false);

  const isSave = isInWishlist(wishlist, item);

  const getTargetUrl = () => {
    return PATH_URL.HOTEL_DETAIL.replace(":id", item.id);
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
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {item.images?.length && (
        <img
          src={item.images[0]?.url}
          alt=""
          className="w-full aspect-square object-cover"
        />
      )}
      <Transition
        show={isHover}
        enter="transition-all duration-[400ms]"
        enterFrom="opacity-0 translate-y-3/4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-[400ms]"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-3/4"
        className="absolute bottom-0 left-0 w-full h-full bg-[#0e131799] z-0"
      />
      <Transition
        show={isHover}
        enter="transition-all duration-[400ms]"
        enterFrom="opacity-0 -translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-[400ms]"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-6"
        className="absolute max-w-[80%] bottom-5 left-1/2 -translate-x-1/2 z-[1]"
      >
        <div className="bg-[#FFF] px-8 py-5">
          <h2 className="flex items-center justify-between gap-2 mb-1">
            <Link
              to={getTargetUrl()}
              className="line-clamp-1 transition-colors hover:text-primary-100"
              title={item.name}
            >
              <span className="text-2xl font-bold leading-normal">
                {item.name}
              </span>
            </Link>
            <span className="shrink-0 text-primary-100 text-sm font-bold leading-6">
              ${item.price}/Night
            </span>
          </h2>
          {item.description && (
            <p className="text-dark-100 mb-4">{item.description}</p>
          )}
          <p className="inline-flex items-center text-dark-100 mb-4">
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
          <div className="text-center border-t border-gray-200 mt-4 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="inline-flex items-center leading-6">
                <StarOutlinedIcon className="text-primary-100" />
                {item.rate}
              </p>
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
      </Transition>
    </div>
  );
}

export default CardImage;
