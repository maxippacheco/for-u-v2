import axios from "axios";

const forUApi = axios.create({
	baseURL: process.env.BASE_URL
})

export default forUApi