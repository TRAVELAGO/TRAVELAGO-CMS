import { useFormik } from "formik";
import "./filter.scss";

function Filter({ filters, roomTypes, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      ...filters,
    },
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="filter">
      <h1>
        Search results for <b>{filters?.name}</b>
      </h1>
      <div className="top">
        <div className="item">
          {/* <label htmlFor="name">Type any here</label> */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Type any here"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="middle">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="roomTypeId"
            value={formik.values.roomTypeId}
            onChange={formik.handleChange}
          >
            <option value="">Any</option>
            {roomTypes.map((value, index) => (
              <option value={value.id} key={index}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="rate">Rate</label>
          <select
            id="rate"
            name="rate"
            value={formik.values.rate}
            onChange={formik.handleChange}
          >
            <option value="">Any</option>
            <option value="1">1*</option>
            <option value="2">2*</option>
            <option value="3">3*</option>
            <option value="4">4*</option>
            <option value="5">5*</option>
          </select>
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            id="minPrice"
            name="priceFrom"
            type="number"
            placeholder="any"
            value={formik.values.priceFrom}
            onChange={formik.handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            id="maxPrice"
            name="priceTo"
            type="number"
            placeholder="any"
            value={formik.values.priceTo}
            onChange={formik.handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="minArea">Min Area</label>
          <input
            id="minArea"
            name="areaFrom"
            type="number"
            placeholder="any"
            value={formik.values.areaFrom}
            onChange={formik.handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxArea">Max Area</label>
          <input
            id="maxArea"
            name="areaTo"
            type="number"
            placeholder="any"
            value={formik.values.areaTo}
            onChange={formik.handleChange}
          />
        </div>
        <button
          type="submit"
          className="submitBtn"
          onClick={formik.handleSubmit}
        >
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
