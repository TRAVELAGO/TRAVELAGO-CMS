import { Transition } from "@headlessui/react";
import React, { useRef } from "react";

import { useClickOutside } from "../../../hook/useClickOutside";
import "./tooltip.scss";

const Tooltip = ({ isOpen, onClose, children }) => {
  const tooltipRef = useRef(null);

  useClickOutside(tooltipRef, onClose);

  return (
    isOpen && (
      <Transition
        show={isOpen}
        enter="transition-opacity duration-30000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-30000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="tooltip-container"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div ref={tooltipRef} className="tooltip-wrapper">
            <div className="tooltip">{children}</div>
          </div>
          <div className="tooltip-bottom-container">
            <div className="tooltip-bottom"></div>
          </div>
        </div>
      </Transition>
    )
  );
};

export default Tooltip;
