import { Transition } from "@headlessui/react";
import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { useClickOutside } from "../../../hook/useClickOutside";
import "./modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <React.Fragment>
        <Transition
          show={isOpen}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#FFF] opacity-40 z-[998]" />

          <div
            className="flex items-center justify-center w-3/5 h-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div
              ref={modalRef}
              className="bg-[#FFF] border border-gray-200 rounded-lg shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)"
            >
              {children}
            </div>
          </div>
        </Transition>
      </React.Fragment>,
      document.body
    )
  );
};

export default Modal;
