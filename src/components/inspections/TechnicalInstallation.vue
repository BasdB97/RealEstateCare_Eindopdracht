<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Technische installaties ID: {{ report.id }}</h2>
		</div>

		<InfoRow label="Locatie:" :value="getValue(report.location)" />

		<InfoRow label="Soort installatie:" :value="getValue(report.installationType)" />

		<InfoRow label="Gemelde storingen:" :value="getValue(report.reportedMalfunction)" />

		<InfoRow label="Testprocedure:" :value="getValue(report.testProcedure)">
			<a v-if="report.testProcedure" :href="report.testProcedure" target="_blank" rel="noopener">
				{{ report.testProcedure }}
			</a>
			<span v-else>Geen testprocedure beschikbaar.</span>
		</InfoRow>

		<InfoRow label="Status:">
			<ion-badge v-if="report.approved" color="success">Goedgekeurd</ion-badge>
			<ion-badge v-else color="danger">Niet goedgekeurd</ion-badge>
		</InfoRow>

		<InfoRow label="Opmerkingen:" :value="getValue(report.comments)" />

		<InfoRow label="Foto's:">
			<div class="photo-grid" v-if="report.photos.length">
				<ion-img
					v-for="(photo, index) in report.photos"
					:key="index"
					:src="getPhotoUrl(photo)"
					class="inspection-photo"
					@click="openPhotoModal(photo)" />
			</div>
		</InfoRow>

		<PhotoModal
			:is-open="isPhotoModalOpen"
			v-model:photo="selectedPhoto"
			:allPhotos="report.photos"
			@close="isPhotoModalOpen = false" />
	</div>
</template>

<script>
import { getValue } from "@/utils/reportHelpers.js";
import { getPhotoUrl } from "@/utils/photoUtils";
import { usePhotoModal } from "@/composables/usePhotoModal.js";
import { IonBadge, IonImg } from "@ionic/vue";
import PhotoModal from "@/components/PhotoModal.vue";
import InfoRow from "@/components/InfoRow.vue";

export default {
	name: "TechnicalInstallation",
	components: {
		IonBadge,
		IonImg,
		PhotoModal,
		InfoRow,
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
			getValue,
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
