import axios from "axios";

const forUApi = axios.create({
	baseURL: 'http://localhost:3000/api'
})

export default forUApi