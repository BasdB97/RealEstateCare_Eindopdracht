import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
	state: () => ({
		reports: [],
		loadingStatus: false,
		error: null,
	}),
	actions: {
		async fetchReports() {
			console.log("🔄 [Store] Starting fetchReports...");
			try {
				this.loading = true;
				this.error = null;
				const isProd = import.meta.env.PROD;
				const env = import.meta.env;

				// Bepaal endpoint
				const url = isProd
					? `https://api.jsonbin.io/v3/b/${env.VITE_JSONBIN_BIN_ID}` // jsonbin.io
					: env.VITE_LOCAL_REPORTS_PATH; // /reports voor json-server

				console.log(`🌐 [Store] Fetching from URL: ${url} (prod: ${isProd})`);

				const response = await axios.get(url, {
					headers: {
						"X-Access-Key": env.VITE_JSONBIN_ACCESS_KEY,
					},
				});

				console.log("📥 [Store] Raw API response:", response);

				const reports = normalizeReports(response.data);
				console.log("🔍 [Store] Reports:", reports);

				// Normaliseer payload (json-server vs jsonbin)
				this.reports = normalizeReports(reports);

				console.log(`✅ [Store] Successfully loaded ${this.reports.length} reports`);
			} catch (err) {
				console.error("❌ [Store] Error fetching reports:", err);
				console.error("❌ [Store] Error details:", {
					message: err.message,
					status: err.response?.status,
					statusText: err.response?.statusText,
					data: err.response?.data,
				});
				this.error = err;
				this.reports = [];
			} finally {
				this.loading = false;
				console.log("🏁 [Store] fetchReports completed");
			}
		},
	},
	getters: {
		sortedReportsByDate: (state) =>
			[...state.reports].sort((a, b) => Date.parse(b.reportDate) - Date.parse(a.reportDate)),
	},
});

function normalizeReports(payload) {
	// json-server @ /reports -> array van reports
	if (Array.isArray(payload)) return payload;

	// jsonbin -> { record: { ...jouwObject... } }
	if (payload?.record?.reports) return payload.record.reports;

	// mocht je het hele object in jsonbin hebben gezet zonder record:
	if (payload?.reports) return payload.reports;

	return [];
}
