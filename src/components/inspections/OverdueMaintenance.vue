<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Achterstallig onderhoud ID: {{ report.id }}</h2>
		</div>

		<InfoRow v-if="report.urgentActionRequired">
			<ion-badge color="danger">Acute actie vereist!</ion-badge>
		</InfoRow>

		<InfoRow label="Locatie:" :value="getValue(report.location)" />

		<InfoRow label="Soort onderhoud:" :value="getValue(report.maintenanceType)" />

		<InfoRow label="Kosten indicatie:" :value="getValue(report.costIndication)" />

		<InfoRow label="Foto's:">
			<template v-if="report.photos.length">
				<div class="photo-grid">
					<ion-img
						v-for="(photo, index) in report.photos"
						:key="index"
						:src="getPhotoUrl(photo)"
						class="inspection-photo"
						@click="openPhotoModal(photo)" />
				</div>
			</template>
			<template v-else>
				<span>Geen foto's beschikbaar.</span>
			</template>
		</InfoRow>

		<!-- Photo Modal -->
		<PhotoModal
			:is-open="isPhotoModalOpen"
			v-model:photo="selectedPhoto"
			:allPhotos="report.photos"
			@close="isPhotoModalOpen = false" />
	</div>
</template>
<script>
import InfoRow from "@/components/InfoRow.vue";
import { getValue } from "@/utils/reportHelpers.js";
import { getPhotoUrl } from "@/utils/photoUtils";
import { usePhotoModal } from "@/composables/usePhotoModal.js";
import PhotoModal from "@/components/PhotoModal.vue";

import { IonChip, IonLabel, IonBadge, IonImg } from "@ionic/vue";
export default {
	name: "OverdueMaintenance",
	components: {
		IonChip,
		IonLabel,
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
		};
	},
	methods: {
		getValue(value, fallback = "Niet beschikbaar") {
			return value || fallback;
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
