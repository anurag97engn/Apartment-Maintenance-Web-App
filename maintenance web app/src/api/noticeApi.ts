import axios from "axios";

export const getNotices = () => axios.get("/api/notices");
export const addNotice = (data: any) => axios.post("/api/notices", data);
export const updateNotice = (id: string, data: any) => axios.put(`/api/notices/${id}`, data);
export const deleteNotice = (id: string) => axios.delete(`/api/notices/${id}`);