import { defineStore } from "pinia";
import axios from "axios";

const localUrl = "http://localhost:3000/reports";

export const useStore = defineStore("store", {
	state: () => ({
		reports: [],
		loadingStatus: false,
		error: null,
	}),
	actions: {
		fetchReports() {
			this.loadingStatus = true;
			console.log("Fetching reports....");

			axios
				.get(localUrl)
				.then((result) => {
					this.loadingStatus = false;
					console.log("Data fetched succesfully!!");

					this.reports = result.data;
					console.log(result.data);
				})
				.catch((err) => {
					this.loadingStatus = false;
					this.reports = [];
					console.log("Fetching data failed!!!");
					this.error = err;
					console.log("Error:" + this.error);
				});
		},
	},
	getters: {
		sortedReportsByDate: (state) =>
			[...state.reports].sort((a, b) => Date.parse(b.reportDate) - Date.parse(a.reportDate)),
	},
});
