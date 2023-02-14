import axios from "axios";

const forUApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export default forUApi