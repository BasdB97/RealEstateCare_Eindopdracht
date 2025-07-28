<template>
	<div class="inspection-card">
		<div class="header">
			<h2 class="title">Schade ID: {{ report.id }}</h2>
			<ion-chip v-if="report.new" color="danger">
				<ion-label>Nieuwe schade</ion-label>
			</ion-chip>
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

		<div class="info-row" v-if="report.urgentActionRequired">
			<ion-badge color="danger">Acute actie vereist</ion-badge>
		</div>

		<div class="info-row">
			<strong>Omschrijving:</strong>
			<p>{{ report.description || "Geen omschrijving beschikbaar." }}</p>
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

		<!-- Photo Modal -->
		<ion-modal :is-open="isPhotoModalOpen" @did-dismiss="closePhotoModal">
			<ion-header>
				<ion-toolbar>
					<ion-title>Foto</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="closePhotoModal">
							<ion-icon :icon="closeOutline"></ion-icon>
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="photo-modal-content">
				<div class="fullscreen-photo-container">
					<ion-img
						:src="getPhotoUrl(selectedPhoto)"
						class="fullscreen-photo"
						v-if="selectedPhoto" />
				</div>
			</ion-content>
		</ion-modal>
	</div>
</template>

<script>
import { getPhotoUrl } from "@/utils/photoUtils";
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
import { closeOutline } from "ionicons/icons";

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
	},
	props: {
		report: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isPhotoModalOpen: false,
			selectedPhoto: "",
			closeOutline,
		};
	},
	methods: {
		getPhotoUrl,
		openPhotoModal(photo) {
			this.selectedPhoto = photo;
			this.isPhotoModalOpen = true;
		},
		closePhotoModal() {
			this.isPhotoModalOpen = false;
			this.selectedPhoto = "";
		},
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
