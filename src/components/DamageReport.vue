<template>
	<div class="damage-report">
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
			<ion-badge color="danger">Urgente actie vereist</ion-badge>
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
					class="report-photo"
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
		getPhotoUrl(filename) {
			return `/photos/${filename}`;
		},
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
.header {
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	inline-size: 100%;
	border-bottom: 1px solid var(--text);
}

.title {
	font-size: 1.5rem;
	color: #000;
}

.subtitle {
	font-size: 0.9rem;
	color: var(--ion-color-medium);
	margin: 0;
}

.info-row {
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;
	padding: 8px 12px;
	background-color: #f9f9f9;
	border-radius: 6px;
	border: 1px solid #e0e0e0;
}

.info-row strong {
	font-weight: 600;
	margin-bottom: 4px;
	color: #333;
}

.info-row span,
.info-row p {
	margin: 0;
	color: #555;
	line-height: 1.4;
	font-size: 0.95rem;
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
	cursor: pointer;
	transition: transform 0.2s ease;
}

.report-photo:hover {
	transform: scale(1.05);
}

.photo-modal-content {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #000;
}

.fullscreen-photo-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
}

.fullscreen-photo {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
}
</style>
