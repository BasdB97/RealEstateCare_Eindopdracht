import { defineStore } from "pinia";
import { api } from "@/services/api";
// import axios from "axios";

export const useStore = defineStore("store", {
	state: () => ({
		reports: [],
		loadingStatus: false,
		error: null,
	}),
	actions: {
		async fetchReports() {
			this.loading = true;
			this.error = null;

			try {
				const isProd = import.meta.env.PROD;
				const env = import.meta.env;

				// Bepaal endpoint
				const url = isProd
					? `/b/${env.VITE_JSONBIN_BIN_ID}/latest` // jsonbin.io
					: env.VITE_LOCAL_REPORTS_PATH; // /reports voor json-server

				const { data } = await api.get(url);

				// Normaliseer payload (json-server vs jsonbin)
				this.reports = normalizeReports(data);
			} catch (err) {
				console.error(err);
				this.error = err;
				this.reports = [];
			} finally {
				this.loading = false;
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
