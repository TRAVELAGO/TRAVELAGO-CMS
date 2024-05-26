import "./listBooking.scss";
import { listData } from "../../lib/dummydata";
import CardBooking from "../cardBooking/CardBooking";

function ListBooking({ data, setBooking }) {
  if (!data) return <></>;
  return (
    <div className="list">
      {data
        .filter((item) => item.status !== 4)
        .map((item) => (
          <CardBooking key={item.id} item={item} setBooking={setBooking} />
        ))}
    </div>
  );
}

export default ListBooking;
