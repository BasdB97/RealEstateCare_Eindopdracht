<template>
	<div class="damage-report">
		<div class="header">
			<h2 class="title">Schade</h2>
			<p class="subtitle">{{ report.date }} – {{ report.location }}</p>
		</div>

		<div class="info-row">
			<strong>Type schade:</strong>
			<span>{{ report.damageType }}</span>
		</div>

		<div class="info-row">
			<strong>Beschrijving:</strong>
			<p>{{ report.description || "Geen omschrijving beschikbaar." }}</p>
		</div>

		<div class="info-row" v-if="report.urgentActionRequired">
			<ion-badge color="danger">Urgente actie vereist</ion-badge>
		</div>

		<div class="photo-grid" v-if="report.photos.length">
			<ion-img
				v-for="(photo, index) in report.photos"
				:key="index"
				:src="getPhotoUrl(photo)"
				class="report-photo" />
		</div>

		<ion-chip v-if="report.new" color="success">
			<ion-label>Nieuw rapport</ion-label>
		</ion-chip>
	</div>
</template>

<script setup>
import { IonBadge, IonImg, IonChip, IonLabel } from "@ionic/vue";

const props = defineProps({
	report: {
		type: Object,
		required: true,
	},
});

const getPhotoUrl = (filename) => {
	return `/photos/${filename}`; // of een andere map indien van toepassing
};
</script>

<style scoped>

.header {
	margin-bottom: 8px;
}

.title {
	font-size: 1.2rem;
	margin: 0;
}

.subtitle {
	font-size: 0.9rem;
	color: var(--ion-color-medium);
	margin: 0;
}

.info-row {
	margin-bottom: 12px;
}

.photo-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 12px;
}

.report-photo {
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 8px;
}
</style>
