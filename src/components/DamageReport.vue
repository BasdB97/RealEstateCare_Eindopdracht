<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Schade ID: {{ report.id }}</h2>
			<ion-chip v-if="report.new" color="danger">
				<ion-label>Nieuwe schade</ion-label>
			</ion-chip>
			<ion-chip v-else color="warning">
				<ion-label>Bestaande schade</ion-label>
			</ion-chip>
		</div>

		<div class="info-row" v-if="report.urgentActionRequired">
			<ion-badge color="danger">Acute actie vereist!</ion-badge>
		</div>

		<div class="info-row">
			<strong>Locatie:</strong>
			<span>{{ report.location }}</span>
		</div>

		<div class="info-row">
			<strong>Soort schade:</strong>
			<span>{{ report.damageType }}</span>
		</div>

		<div class="info-row">
			<strong>Datum:</strong>
			<span>{{ report.date }}</span>
		</div>

		<div class="info-row">
			<strong>Omschrijving:</strong>
			<span>{{ report.description || "Geen omschrijving beschikbaar." }}</span>
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
			<div v-else>
				<span>Geen foto's beschikbaar.</span>
			</div>
		</div>

		<!-- Photo Modal -->
		<PhotoModal :is-open="isPhotoModalOpen" :photo="selectedPhoto" @close="closePhotoModal" />
	</div>
</template>

<script>
import { getPhotoUrl } from "@/utils/photoUtils";
import { usePhotoModal } from "@/composables/usePhotoModal.js";
import PhotoModal from "@/components/PhotoModal.vue";

import {
	IonBadge,
	IonImg,
	IonChip,
	IonLabel,
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonIcon,
	IonContent,
} from "@ionic/vue";

export default {
	name: "DamageReport",
	components: {
		IonBadge,
		IonImg,
		IonChip,
		IonLabel,
		IonModal,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButtons,
		IonButton,
		IonIcon,
		IonContent,
		PhotoModal,
	},
	props: {
		report: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const { isPhotoModalOpen, selectedPhoto, openPhotoModal, closePhotoModal } = usePhotoModal();
		return {
			isPhotoModalOpen,
			selectedPhoto,
			openPhotoModal,
			closePhotoModal,
			getPhotoUrl,
		};
	},
};
</script>

<style scoped>
.title {
	font-size: 1.5rem;
	color: #000;
}

.subtitle {
	font-size: 0.9rem;
	color: var(--ion-color-medium);
	margin: 0;
}
</style>
