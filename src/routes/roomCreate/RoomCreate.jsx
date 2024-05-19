import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { withLoading } from "../../redux/appAction";
import { createRoom } from "../../utils/api";
import { PATH_URL } from "../../utils/const/common";
import "./roomCreate.scss";

function RoomCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentHotel } = useSelector((state) => state.hotel);
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("name", inputs.name);
      formData.append("price", parseInt(inputs.price));
      formData.append("discount", inputs.discount);
      formData.append("description", value);
      formData.append("currentAvailable", parseInt(inputs.currentAvailable)); //bỏ
      formData.append("total", parseInt(inputs.total));
      formData.append("roomTypeId", 1);

      dispatch(
        withLoading(async () => {
          const res = await createRoom(currentHotel.id, formData);
          navigate(PATH_URL.ROOM_DETAIL.replace(":id", res.data.id));
        })
      );
    } catch (err) {
      setError(error);
    }
  };

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    console.log(file);
    setImages((prev) => [...prev, file]);
  };

  return (
    <div className="roomCreate">
      <div className="formContainer">
        <h1>Add New Room</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="name">name</label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="discount">discount</label>
              <input id="discount" name="discount" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>

            <div className="item">
              <label htmlFor="currentAvailable">currentAvailable Number</label>
              <input
                min={1}
                id="currentAvailable"
                name="currentAvailable"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="total">total Number</label>
              <input min={1} id="total" name="total" type="number" />
            </div>

            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <button className="sendButton">Add</button>
            <input
              type="file"
              id="images"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor="images" className="sendButton">
              Choose Images
            </label>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images?.length > 0 ? (
          images.map((image, index) => (
            <img src={URL.createObjectURL(image)} key={index} alt="" />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default RoomCreate;
