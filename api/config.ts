import axios from "axios";

const forUApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api'
})

export default forUApi