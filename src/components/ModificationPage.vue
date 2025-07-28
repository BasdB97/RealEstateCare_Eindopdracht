<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Modificatie ID: {{ report.id }}</h2>
		</div>

		<div class="info-row">
			<strong>Bestaand situatie en reeds gedocumenteerde modificaties:</strong>
			<a
				v-if="report.currentSituation"
				:href="report.currentSituation"
				target="_blank"
				rel="noopener">
				Open bestaand situatie (PDF)
			</a>
			<span v-else>Geen bestaand situatie beschikbaar</span>
		</div>

		<div class="info-row">
			<strong>Locatie:</strong>
			<span>{{ report.location }}</span>
		</div>

		<div class="info-row">
			<strong>Uitgevoerd door:</strong>
			<span>{{ report.executedBy }}</span>
		</div>

		<div class="info-row">
			<strong>Beschrijving:</strong>
			<span>{{ report.modificationDescription }}</span>
		</div>

		<div class="info-row">
			<strong>Te ondernemen actie:</strong>
			<span>{{ report.actionRequired }}</span>
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
import { IonImg } from "@ionic/vue";
import PhotoModal from "@/components/PhotoModal.vue";

export default {
	name: "ModificationPage",
	components: {
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
