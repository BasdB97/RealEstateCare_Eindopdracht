<template>
	<base-layout pageTitle="Assigned Reports">
		<ion-spinner v-if="loading" name="circles" id="spinner"></ion-spinner>
		<ion-content v-else>
			<h1 class="ion-text-center">Toegewezen rapportages</h1>
			<ion-card
				v-for="report in reports"
				:key="report.id"
				:class="['report-card', { 'content-open': report.showContent }]">
				<ion-card-header @click="toggleReport(report)" class="report-card-header">
					<ion-card-title>
						{{ report.street }} {{ report.houseNumber }}, {{ report.city }}
					</ion-card-title>
					<ion-card-subtitle class="report-card-subtitle">
						{{ report.reportDate }}
					</ion-card-subtitle>
				</ion-card-header>

				<ion-card-content v-if="report.showContent">
					<div v-for="(inspection, i) in report.inspections" :key="i">
						<DamageReport
							v-for="damageReport in inspection.damageReports"
							:key="damageReport.id"
							:report="damageReport" />

						<OverdueMaintenance
							v-for="overdueMaintenance in inspection.overdueMaintenance"
							:key="overdueMaintenance.id"
							:report="overdueMaintenance" />

						<TechnicalInstallation
							v-for="technicalInstallation in inspection.technicalInstallations"
							:key="technicalInstallation.id"
							:report="technicalInstallation" />

						<Modification
							v-for="modification in inspection.modifications"
							:key="modification.id"
							:report="modification" />
					</div>
				</ion-card-content>
			</ion-card>
		</ion-content>
	</base-layout>
</template>

<script>
import {
	IonContent,
	IonSpinner,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonIcon,
} from "@ionic/vue";
import { useStore } from "../store/store";
import DamageReport from "../components/DamageReport.vue";
import OverdueMaintenance from "../components/OverdueMaintenance.vue";
import TechnicalInstallation from "../components/TechnicalInstallation.vue";
import Modification from "../components/ModificationPage.vue";
export default {
	name: "AssignedReports",
	components: {
		IonContent,
		IonSpinner,
		IonCard,
		IonIcon,
		IonCardHeader,
		IonCardTitle,
		IonCardSubtitle,
		IonCardContent,
		DamageReport,
		OverdueMaintenance,
		TechnicalInstallation,
		Modification,
	},
	data() {
		return {
			store: useStore(),
		};
	},
	mounted() {
		this.store.fetchReports();
	},
	methods: {
		// Method that closes all reports and opens the selected report
		toggleReport(selectedReport) {
			const isCurrentlyOpen = selectedReport.showContent;

			this.reports.forEach((report) => {
				report.showContent = false;
			});

			if (!isCurrentlyOpen) {
				selectedReport.showContent = true;
			}
		},
	},
	computed: {
		reports() {
			return this.store.sortedReportsByDate;
		},
		loading() {
			return this.store.loadingStatus;
		},
	},
};
</script>
<style scoped>
ion-card-title {
	font-size: 1.5rem;
}
#spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.report-card {
	box-shadow: 0 15px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.15);
	border-radius: 0.5rem; /* 8px */
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 200ms;
}
.report-card-header {
	cursor: pointer;
}
</style>
