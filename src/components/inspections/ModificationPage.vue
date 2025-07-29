<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Modificatie ID: {{ report.id }}</h2>
		</div>

		<InfoRow label="Bestaande situatie en gedocumenteerde modificaties">
			<a
				v-if="report.currentSituation"
				:href="report.currentSituation"
				target="_blank"
				rel="noopener">
				{{ report.currentSituation }}
			</a>
			<span v-else>Geen bestaande situatie beschikbaar</span>
		</InfoRow>

		<InfoRow label="Locatie:" :value="getValue(report.location)" />
		<InfoRow label="Uitgevoerd door:" :value="getValue(report.executedBy)" />
		<InfoRow label="Beschrijving:" :value="getValue(report.modificationDescription)" />
		<InfoRow label="Te ondernemen actie:" :value="getValue(report.actionRequired)" />
		<InfoRow label="Opmerkingen:" :value="getValue(report.comments)" />

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
import { IonImg } from "@ionic/vue";
import PhotoModal from "@/components/PhotoModal.vue";

export default {
	name: "ModificationPage",
	components: {
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
