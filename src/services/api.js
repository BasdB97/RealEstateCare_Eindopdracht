// src/services/api.js
import axios from "axios";

const isProd = import.meta.env.PROD;
const env = import.meta.env;

let baseURL = "";
let defaultHeaders = {};

if (env.VITE_API_ENV === "prod") {
	baseURL = env.VITE_JSONBIN_BASE;
	defaultHeaders["X-Access-Key"] = env.VITE_JSONBIN_ACCESS_KEY;
} else {
	baseURL = env.VITE_LOCAL_API_BASE;
}

export const api = axios.create({
	baseURL,
	headers: defaultHeaders,
});
