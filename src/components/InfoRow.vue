<template>
	<ion-row class="info-row">
		<ion-col size="12" class="label">
			<strong>{{ label }}</strong>
		</ion-col>
		<ion-col size="12" class="value">
			<slot>
				{{ value }}
			</slot>
		</ion-col>
	</ion-row>
</template>

<script setup>
import { IonRow, IonCol } from "@ionic/vue";
defineProps({
	label: String,
	value: [String, Number, Boolean],
});
</script>

<style scoped>
ion-col {
	padding: 0;
}

.value {
	margin: 0;
	color: #555;
	line-height: 1.4;
	font-size: 0.95rem;
}
.value :deep(ion-badge) {
	display: block;
	width: 100%;
}
</style>
