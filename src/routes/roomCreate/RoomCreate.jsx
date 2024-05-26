import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { withLoading } from "../../redux/appAction";
import {
  createRoom,
  getAllRoomType,
  getRoomById,
  updateRoom,
} from "../../utils/api";
import { PATH_URL } from "../../utils/const/common";
import "./roomCreate.scss";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

function RoomCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentHotel } = useSelector((state) => state.hotel);
  const location = useLocation();
  const roomId = location.pathname.split("/")[3];
  const formRef = useRef(null);

  const [value, setValue] = useState("");
  const [hover, setHover] = useState(-1);
  const [images, setImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [error, setError] = useState("");
  const [room, setRoom] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const room = await getRoomById(roomId);
        setRoom(room.data);
        setImages([]);

        room.data.images.map((i) => setImages((prev) => [...prev, i]));
        setValue(room.data.description);
        if (formRef.current) {
          formRef.current.name.value = room.data.name;
          formRef.current.price.value = room.data.price;
          formRef.current.discount.value = room.data.discount;
          formRef.current.roomTypeId.value = room.data.roomType.id;
          formRef.current.total.value = room.data.total;

          console.log(formRef.current.roomTypeId.value);
        }
      } catch (error) {
        console.log(error);
      }
    };

    dispatch(
      withLoading(async () => {
        const roomTypes = await getAllRoomType();
        setRoomTypes(roomTypes.data);

        if (roomId) {
          await getRoom();
        }
      })
    );
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        typeof image?.url !== "string" && formData.append("images", image);
      });
      roomId &&
        deleteImages.forEach((image) => {
          formData.append("deleteImages", image);
        });
      formData.append("name", inputs.name);
      formData.append("price", parseInt(inputs.price));
      formData.append("discount", inputs.discount);
      formData.append("description", value);
      formData.append("total", parseInt(inputs.total));
      formData.append("roomTypeId", inputs.roomTypeId);

      dispatch(
        withLoading(async () => {
          if (roomId) {
            const res = await updateRoom(room.id, formData);
            navigate(PATH_URL.ROOM_DETAIL.replace(":id", res.data.id));
          } else {
            const res = await createRoom(currentHotel.id, formData);
            navigate(PATH_URL.ROOM_DETAIL.replace(":id", res.data.id));
          }
        })
      );
    } catch (err) {
      setError(error);
    }
  };

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) return;

    setImages((prev) => [...prev, file]);
  };
  const handleDeleteImage = (index) => {
    setImages((prevArr) => {
      return prevArr.filter((_, i) => i !== index);
    });
    setDeleteImages(
      (prev) =>
        typeof images[index]?.url === "string" && [...prev, images[index]?.key]
    );
    setHover(-1);
  };

  return (
    <div className="roomCreate">
      <div className="formContainer">
        <h1>{roomId ? "Cập nhật phòng" : "Tạo phòng mới"}</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="w-full">
              <input
                type="file"
                id="images"
                accept=".jpg, .jpeg, .png"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e)}
              />
              <label htmlFor="images" className="chooseImage">
                <DriveFolderUploadOutlinedIcon />
                Choose Images
              </label>
            </div>
            <div className="item">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Room name"
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
              />
            </div>
            <div className="item">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                id="discount"
                name="discount"
                placeholder="Discount"
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>

            <div className="item">
              <label htmlFor="total">Total Number</label>
              <input
                type="number"
                id="total"
                name="total"
                min={1}
                placeholder="Total Number"
              />
            </div>
            <div className="item">
              <label htmlFor="type">Room Type</label>
              <select id="type" name="roomTypeId">
                {roomTypes.map((value, index) => (
                  <option value={value.id} key={index}>
                    {value.bedType1}
                  </option>
                ))}
              </select>
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

            {error && <span>error</span>}

            <button className="sendButton">
              {roomId ? "Cập nhật" : "Thêm"}
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images?.length > 0 ? (
          images.map((image, index) => (
            <div
              className="image"
              key={index}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
            >
              {hover === index && (
                <div className="hover">
                  <button onClick={() => handleDeleteImage(index)}>Xóa</button>
                </div>
              )}
              <img
                src={
                  typeof image?.url === "string"
                    ? image?.url
                    : URL.createObjectURL(image)
                }
                alt=""
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default RoomCreate;
