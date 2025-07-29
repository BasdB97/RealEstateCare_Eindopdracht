<template>
	<ion-modal
		:is-open="isOpen"
		@did-dismiss="handleClose"
		:swipe-to-close="true"
		:keyboard-close="true">
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
			<div class="fullscreen-photo-container" @touchstart="onTouchStart" @touchend="onTouchEnd">
				<ion-img :src="getPhotoUrl(photo)" class="fullscreen-photo" v-if="photo" />
				<p class="photo-indicator" v-if="allPhotos.length > 1">
					Foto {{ currentIndex + 1 }} van {{ allPhotos.length }}
				</p>
			</div>
		</ion-content>
	</ion-modal>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
		isOpen: Boolean,
		photo: String,
		allPhotos: {
			type: Array,
			default: () => [],
		},
	},
	emits: ["close", "update:photo"],
	setup(props, { emit }) {
		const currentIndex = computed(() => props.allPhotos.indexOf(props.photo));
		const touchStartX = ref(0);
		const touchEndX = ref(0);

		const handleClose = () => emit("close");

		const nextPhoto = () => {
			const next = currentIndex.value + 1;
			if (next < props.allPhotos.length) {
				emit("update:photo", props.allPhotos[next]);
			}
		};

		const prevPhoto = () => {
			const prev = currentIndex.value - 1;
			if (prev >= 0) {
				emit("update:photo", props.allPhotos[prev]);
			}
		};

		const onTouchStart = (e) => {
			touchStartX.value = e.changedTouches[0].screenX;
		};

		const onTouchEnd = (e) => {
			touchEndX.value = e.changedTouches[0].screenX;
			handleSwipe();
		};

		const handleSwipe = () => {
			const diff = touchStartX.value - touchEndX.value;
			const threshold = 50; // px verschil om swipe te activeren
			if (diff > threshold) nextPhoto();
			else if (diff < -threshold) prevPhoto();
		};

		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				handleClose();
			}
		};

		onMounted(() => {
			window.addEventListener("keydown", handleKeyDown);
		});

		onUnmounted(() => {
			window.removeEventListener("keydown", handleKeyDown);
		});

		return {
			getPhotoUrl,
			currentIndex,
			closeOutline,
			handleClose,
			onTouchStart,
			onTouchEnd,
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
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--ion-color-light-shade);
	overflow: hidden;
	padding-bottom: 1.5rem;
	touch-action: pan-y;
}

.fullscreen-photo {
	max-width: 100%;
	max-height: 90%;
	object-fit: contain;
	border: 1.5px solid rgba(0, 0, 0, 0.08);
	user-select: none;
}

.photo-indicator {
	margin-top: 1rem;
	font-size: 1rem;
	color: var(--ion-color-medium);
}
</style>
