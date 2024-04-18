import { defer } from "react-router-dom";
import { getRoomByFilter, getRoomByHotelId, getRoomById } from "../utils/api";

export const singlePageLoader = async ({ request, params }) => {
    const res = await getRoomById(params.id)
    return res.data;
};
export const listPageLoader = async ({ request, params }) => {
    // const query = request.url.split("?")[1];
    // const postPromise = getRoomByFilter(query);
    const postPromise = await getRoomById('65ba0bb2-c2a3-45d8-a283-320b4c5d130c')
    return postPromise.data
};

export const profilePageLoader = async () => {
    const postPromise = await getRoomById('65ba0bb2-c2a3-45d8-a283-320b4c5d130c')
    return postPromise.data
};