import { useLocation, useNavigate } from "react-router-dom";

import { PATH_URL } from "../../utils/const/common";
import "./paymentPage.scss";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);
  const bookingId = queryParams.get("vnp_TxnRef");
  console.log(bookingId);

  const handleNavigate = () => {
    navigate(PATH_URL.BOOKING_DETAIL.replace(":id", bookingId));
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
