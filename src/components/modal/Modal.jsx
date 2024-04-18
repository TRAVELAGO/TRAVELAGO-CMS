import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useClickOutside } from "../../hook/useClickOutside";
import "./modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <React.Fragment>
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
      </React.Fragment>,
      document.body
    )
  );
};

export default Modal;
