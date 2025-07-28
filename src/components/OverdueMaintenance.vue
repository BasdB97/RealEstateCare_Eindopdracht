<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Achterstallig onderhoud ID: {{ report.id }}</h2>
		</div>

		<div class="info-row">
			<strong>Locatie:</strong>
			<span>{{ report.location }}</span>
		</div>

		<div class="info-row">
			<strong>Soort onderhoud:</strong>
			<span>{{ report.maintenanceType }}</span>
		</div>

		<div class="info-row" v-if="report.urgentActionRequired">
			<ion-badge color="danger">Acute actie vereist</ion-badge>
		</div>

		<div class="info-row">
			<strong>Kosten indicatie:</strong>
			<ion-label
				:color="
					report.costIndication === '0-500'
						? 'success'
						: report.costIndication === '500-1500'
						? 'warning'
						: 'danger'
				">
				{{ report.costIndication || "Onbekend" }}
			</ion-label>
		</div>

		<div class="info-row">
			<strong>Foto's:</strong>
			<div class="photo-grid" v-if="report.photos.length">
				<ion-img
					v-for="(photo, index) in report.photos"
					:key="index"
					:src="getPhotoUrl(photo)"
					class="inspection-photo"
					@click="openPhotoModal(photo)" />
			</div>
			<div v-else></div>
		</div>
	</div>
</template>
<script>
import { IonChip, IonLabel } from "@ionic/vue";
export default {
	name: "OverdueMaintenance",
	components: {
		IonChip,
		IonLabel,
	},
	props: {
		report: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.title {
	font-size: 1.5rem;
	color: #000;
}
</style>
