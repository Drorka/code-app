import Axios from "axios";

export const httpService = {
	get,
};

const BASE_URL =
	import.meta.env.VITE_ENV === "production"
		? import.meta.env.VITE_BASE_API_PROD
		: import.meta.env.VITE_BASE_API_DEV;

// const BASE_URL = "//localhost:3030/api/";
// const BASE_URL = "https://code-app-dszr.onrender.com/api/";

const axios = Axios.create({
	baseURL: BASE_URL,
	withCredentials: false,
});

async function get(endpoint, data) {
	try {
		const response = await axios.get(endpoint, { params: data });
		return response.data;
	} catch (error) {
		console.error(
			`Had Issues getting to the backend, endpoint: ${endpoint}, with data: `,
			data
		);
		throw error;
	}
}
