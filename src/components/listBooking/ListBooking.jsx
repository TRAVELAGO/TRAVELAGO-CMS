import "./listBooking.scss";
import { listData } from "../../lib/dummydata";
import CardBooking from "../cardBooking/CardBooking";

function ListBooking({ data, setBooking }) {
  return (
    <div className="list">
      {data?.map(
        (item) =>
          item.status !== 4 && (
            <CardBooking key={item.id} item={item} setBooking={setBooking} />
          )
      )}
    </div>
  );
}

export default ListBooking;
