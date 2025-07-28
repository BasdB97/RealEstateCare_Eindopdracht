<template>
	<ion-modal :is-open="isOpen" @did-dismiss="handleClose">
		<ion-header>
			<ion-toolbar>
				<ion-title>Foto</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="handleClose">
						<ion-icon :icon="closeOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="photo-modal-content">
			<div class="fullscreen-photo-container">
				<ion-img :src="getPhotoUrl(photo)" class="fullscreen-photo" v-if="photo" />
			</div>
		</ion-content>
	</ion-modal>
</template>

<script>
import { getPhotoUrl } from "@/utils/photoUtils";
import {
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonIcon,
	IonContent,
	IonImg,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

export default {
	name: "PhotoModal",
	components: {
		IonModal,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButtons,
		IonButton,
		IonIcon,
		IonContent,
		IonImg,
	},
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
		photo: {
			type: String,
			default: "",
		},
	},
	emits: ["close"],
	setup(props, { emit }) {
		const handleClose = () => {
			emit("close");
		};

		return {
			getPhotoUrl,
			closeOutline,
			handleClose,
		};
	},
};
</script>

<style scoped>
.photo-modal-content {
	--padding-top: 0;
	--padding-bottom: 0;
	--padding-start: 0;
	--padding-end: 0;
}

.fullscreen-photo-container {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--ion-color-light-shade);
}

.fullscreen-photo {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	border: 1.5px solid rgba(0, 0, 0, 0.08);
}
</style>
