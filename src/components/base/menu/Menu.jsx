import { Transition } from "@headlessui/react";
import React, { useRef } from "react";

import { useClickOutside } from "../../../hook/useClickOutside";

const Menu = ({ isOpen, onClose, children, classNames }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  const positionClasses = "absolute top-full right-0 z-[99]";
  const layoutClasses =
    "bg-[#FFF] min-w-60 shadow-[0px_10px_50px_rgba(0,0,0,0.05)]";
  const classes = [positionClasses, layoutClasses, classNames].join(" ");

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      ref={modalRef}
      className={classes}
    >
      {children}
    </Transition>
  );
};

export default Menu;
