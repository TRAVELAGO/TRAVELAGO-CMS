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
          enter="transition-opacity duration-30000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-30000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-overlay" />

          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div ref={modalRef} className="modal">
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
