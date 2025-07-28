<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Technische installaties ID: {{ report.id }}</h2>
		</div>

		<div class="info-row">
			<strong>Locatie:</strong>
			<span>{{ report.location }}</span>
		</div>

		<div class="info-row">
			<strong>Soort installatie:</strong>
			<span>{{ report.installationType }}</span>
		</div>

		<div class="info-row">
			<strong>Gemelde storingen:</strong>
			<span>{{ report.reportedMalfunction }}</span>
		</div>

		<div class="info-row">
			<strong>Testprocedure:</strong>
			<a v-if="report.testProcedure" :href="report.testProcedure" target="_blank" rel="noopener">
				Open testprocedure (PDF)
			</a>
			<span v-else>Geen testprocedure beschikbaar</span>
		</div>

		<div class="info-row">
			<ion-badge v-if="report.approved" color="success">Goedgekeurd</ion-badge>
			<ion-badge v-else color="danger">Niet goedgekeurd</ion-badge>
		</div>

		<div class="info-row">
			<strong>Opmerkingen:</strong>
			<span>{{ report.comments }}</span>
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
		</div>

		<PhotoModal :is-open="isPhotoModalOpen" :photo="selectedPhoto" @close="closePhotoModal" />
	</div>
</template>

<script>
import { getPhotoUrl } from "@/utils/photoUtils";
import { usePhotoModal } from "@/composables/usePhotoModal.js";
import { IonBadge, IonImg } from "@ionic/vue";
import PhotoModal from "@/components/PhotoModal.vue";

export default {
	name: "TechnicalInstallation",
	components: {
		IonBadge,
		IonImg,
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
</style>
