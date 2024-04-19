import { defer } from "react-router-dom";
import { getBooking, getRoomByFilter, getRoomByHotelId, getRoomById } from "../utils/api";
import { useSelector } from "react-redux";

export const singlePageLoader = async ({ request, params }) => {
    const res = await getRoomById(params.id)
    return res.data;
};
export const listPageLoader = async ({ request, params }) => {
    // const query = request.url.split("?")[1];
    // const postPromise = getRoomByFilter(query);
    const res = await getRoomById('65ba0bb2-c2a3-45d8-a283-320b4c5d130c')
    return res.data
};

export const profilePageLoader = async () => {
    const res = await getRoomById('65ba0bb2-c2a3-45d8-a283-320b4c5d130c')
    // const res2 = await getBooking()
    return res.data
};