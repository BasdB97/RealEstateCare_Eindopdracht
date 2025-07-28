export function getPhotoUrl(filename) {
	return `/photos/${filename}`;
}

export function openPhotoModal(context, photo) {
	context.selectedPhoto = photo;
	context.isPhotoModalOpen = true;
}

export function closePhotoModal(context) {
	context.isPhotoModalOpen = false;
	context.selectedPhoto = "";
}
