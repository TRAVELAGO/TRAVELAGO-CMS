import { makeRequest } from "./axios"
//auth
export const login = async (user) => {
    const res = await makeRequest.post("auth/login", user);
    return res
}
export const register = async (user) => {
    const res = await makeRequest.post("auth/register", user);
    return res
}
//thêm refreshtoken sau

//hotel
export const findAllHotel = async () => {
    const res = await makeRequest.get("hotels");
    return res
}
export const findHotelById = async (id) => {
    const res = await makeRequest.get("hotels/" + id);
    return res
}
export const createHotel = async (hotel) => {
    const res = await makeRequest.post("hotels", hotel);
    return res
}
export const updateHotel = async (id, hotel) => {
    const res = await makeRequest.put("hotels/" + id, hotel);
    return res
}
export const deleteHotel = async (id) => {
    const res = await makeRequest.delete("hotels/" + id);
    return res
}

//room
export const getRoomById = async (id) => {
    const res = await makeRequest.get("rooms/" + id);
    return res
}
export const getRoomByFilter = async (filter) => {
    const res = await makeRequest.get("rooms/" + id);
    return res
}
export const getRoomByHotelId = async (id) => {
    const res = await makeRequest.get("hotels/" + id + "/rooms");
    return res
}
export const createRoom = async (id, newRoom) => {
    const res = await makeRequest.post("hotels/" + id + "/rooms", newRoom, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    return res
}
export const updateRoom = async (id, newRoom) => {
    const res = await makeRequest.patch("rooms/" + id, newRoom);
    return res
}
export const deleteRoom = async (id) => {
    const res = await makeRequest.delete("rooms/" + id);
    return res
}

//room-type
export const getRoomTypeById = async (id) => {
    const res = await makeRequest.get("room-types/" + id);
    return res
}
export const getAllRoomType = async () => {
    const res = await makeRequest.get("room-types");
    return res
}
export const createRoomType = async (data) => {
    const res = await makeRequest.post("room-types", data);
    return res
}
export const updateRoomType = async (id, data) => {
    const res = await makeRequest.patch("room-types/" + id, data);
    return res
}
export const deleteRoomType = async (id) => {
    const res = await makeRequest.delete("room-types/" + id);
    return res
}