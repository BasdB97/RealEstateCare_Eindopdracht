<template>
	<base-layout pageTitle="Assigned Reports">
		<ion-spinner v-if="loading.value" name="circles" id="spinner"></ion-spinner>
		<ion-content v-else>
			<h1 class="ion-text-center">Toegewezen rapportages</h1>
			<ion-card v-for="report in reports" :key="report.id" class="report-card">
				<ion-card-header @click="report.showContent = !report.showContent">
					<div class="header-content">
						<div class="header-text">
							<ion-card-title>
								{{ report.location }}
							</ion-card-title>
							<ion-card-subtitle>
								{{ report.reportDate }}
							</ion-card-subtitle>
						</div>
						<ion-button fill="clear" @click="editReport(report.id, $event)" class="edit-button">
							<ion-icon :icon="createOutline" slot="icon-only" size="large"></ion-icon>
						</ion-button>
					</div>
				</ion-card-header>

				<transition name="fade">
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
	IonButton,
	IonIcon,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";
import { createOutline } from "ionicons/icons";

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
		IonButton,
		IonIcon,
		DamageReport,
		OverdueMaintenance,
		TechnicalInstallation,
		Modification,
	},
	setup() {
		const store = useStore();
		const router = useRouter();

		const openedReportIds = ref([]);

		const toggleReport = (reportId) => {
			const index = openedReportIds.value.indexOf(reportId);
			if (index > -1) {
				// Rapport is al open, sluit het
				openedReportIds.value.splice(index, 1);
			} else {
				// Rapport is gesloten, open het
				openedReportIds.value.push(reportId);
			}
		};

		const editReport = (reportId, event) => {
			// Voorkom dat de toggle functie wordt uitgevoerd
			event.stopPropagation();
			// Navigeer naar edit pagina (pas aan naar jouw route structuur)
			router.push(`/reports/${reportId}/edit`);
		};

		onMounted(() => {
			store.fetchReports();
		});

		return {
			reports: computed(() => store.sortedReportsByDate),
			loading: computed(() => store.loadingStatus),
			toggleReport,
			openedReportIds,
			editReport,
			createOutline,
		};
	},
};
</script>
<style scoped>
ion-card-title {
	font-size: 1rem;
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

.header-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.header-text {
	flex: 1;
}

.edit-button {
	--color: #000;
	margin: 0;
	min-width: 48px;
	min-height: 48px;
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
