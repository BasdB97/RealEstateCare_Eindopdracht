<template>
	<base-layout pageTitle="Assigned Reports">
		<ion-spinner v-if="loading.value" name="circles" id="spinner"></ion-spinner>
		<ion-content v-else>
			<h1 class="ion-text-center">Toegewezen rapportages</h1>
			<ion-card
				v-for="report in reports"
				:key="report.id"
				:class="['report-card', { 'content-open': report.id === openedReportId }]">
				<ion-card-header @click="toggleReport(report.id)" class="report-card-header">
					<ion-card-title>
						{{ report.street }} {{ report.houseNumber }}, {{ report.city }}
					</ion-card-title>
					<ion-card-subtitle class="report-card-subtitle">
						{{ report.reportDate }}
					</ion-card-subtitle>
				</ion-card-header>

				<transition name="fade">
					<ion-card-content v-if="report.id === openedReportId">
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
				</transition>
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "../store/store";

import DamageReport from "@/components/inspections/DamageReport.vue";
import OverdueMaintenance from "@/components/inspections/OverdueMaintenance.vue";
import TechnicalInstallation from "@/components/inspections/TechnicalInstallation.vue";
import Modification from "@/components/inspections/ModificationPage.vue";

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
	setup() {
		const store = useStore();

		const openedReportId = ref(null);

		const toggleReport = (reportId) => {
			openedReportId.value = openedReportId.value === reportId ? null : reportId;
		};

		onMounted(() => {
			store.fetchReports();
		});

		return {
			reports: computed(() => store.sortedReportsByDate),
			loading: computed(() => store.loadingStatus),
			toggleReport,
			openedReportId,
		};
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
