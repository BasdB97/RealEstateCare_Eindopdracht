<template>
	<base-layout pageTitle="Assigned Reports">
		<ion-spinner v-if="loading" name="circles" id="spinner"></ion-spinner>
		<ion-content v-else>
			<h1 class="ion-text-center">Toegewezen rapportages</h1>
			<ion-card v-for="report in reports" :key="report.id" class="report-card">
				<ion-card-header
					@click="report.showContent = !report.showContent"
					class="report-card-header">
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
						<!-- <OverdueMaintenance
							v-if="inspection.overdueMaintenance"
							:report="inspection.overdueMaintenance" />
				<TechnicalInstallation
							v-if="inspection.technicalInstallation"
							:report="inspection.technicalInstallation" />
						<Modification v-if="inspection.modification" :report="inspection.modification" /> -->
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
.report-card:hover {
	transform: scale(1.05);
	box-shadow: 0 15px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.report-card:active {
	transform: scale(0.95);
	transition-duration: 200ms;
}
</style>
