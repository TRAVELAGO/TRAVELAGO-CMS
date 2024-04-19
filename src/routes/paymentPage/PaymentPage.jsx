import { useState } from "react";
import "./paymentPage.scss";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);
  const bookingId = queryParams.get("vnp_TxnRef");
  console.log(bookingId);
  const handleNavigate = () => {
    navigate("/bookingDetail/" + bookingId);
  };
  return (
    <div className="paymentPage">
      <div className="wrapper">
        <img src="/success-icon.png" alt="" />
        <p>Thanh toán thành công</p>
        <button onClick={handleNavigate}>Chuyển hướng</button>
      </div>
    </div>
  );
}

export default PaymentPage;
