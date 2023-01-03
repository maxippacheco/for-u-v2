import axios from "axios";

const forUApi = axios.create({
	baseURL: '/api'
})

export default forUApi