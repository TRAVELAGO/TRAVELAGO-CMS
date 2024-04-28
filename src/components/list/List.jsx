import Card from "../card/Card";
import "./list.scss";

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
