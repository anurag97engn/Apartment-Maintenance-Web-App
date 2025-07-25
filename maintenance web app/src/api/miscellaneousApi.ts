import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

// Add a new miscellaneous expense to the maintenance account

export const getMiscExpenses = () => axios.get("/api/misc-expenses");
export const addMiscExpense = (data: any) => axios.post("/api/misc-expenses", data);
