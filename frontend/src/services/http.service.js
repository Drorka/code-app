import Axios from "axios";

export const httpService = {
	get,
};

const BASE_URL = import.meta.env.DEV
	? import.meta.env.VITE_BASE_API_DEV
	: import.meta.env.VITE_BASE_API_PROD;

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
