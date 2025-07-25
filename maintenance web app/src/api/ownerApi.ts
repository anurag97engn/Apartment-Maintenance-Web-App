import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const getOwners = () => axios.get("/api/owners");
export const addOwner = (data: any) => axios.post("/api/owners", data);
export const updateOwner = (id: string, data: any) => axios.put(`/api/owners/${id}`, data);
export const deleteOwner = (id: string) => axios.delete(`/api/owners/${id}`);
export const addLedger = (id: string, data: any) => axios.post(`/api/owners/${id}/ledger`, data);