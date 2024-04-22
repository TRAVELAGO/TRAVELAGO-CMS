import { useFormik } from "formik";
import "./filter.scss";

function Filter({ filters, onSubmit }) {
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
        Search results for <b>{filters.name}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            id="city"
            name="name"
            type="text"
            placeholder="City Location"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
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
