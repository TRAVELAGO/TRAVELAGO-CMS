import "./list.scss";
import Card from "../card/Card";
import { listData } from "../../lib/dummydata";

function List({ data }) {
  return (
    <div className="list">
      {data?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
