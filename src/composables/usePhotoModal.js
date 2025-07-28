// composables/usePhotoModal.js
import { ref } from "vue";

export function usePhotoModal() {
	const isPhotoModalOpen = ref(false);
	const selectedPhoto = ref("");

	function openPhotoModal(photo) {
		selectedPhoto.value = photo;
		isPhotoModalOpen.value = true;
	}

	function closePhotoModal() {
		selectedPhoto.value = "";
		isPhotoModalOpen.value = false;
	}

	return {
		isPhotoModalOpen,
		selectedPhoto,
		openPhotoModal,
		closePhotoModal,
	};
}
