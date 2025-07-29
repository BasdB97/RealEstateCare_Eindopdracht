<template>
	<header>
		<div class="header-container">
			<router-link to="/">
				<img src="/src/assets/images/logo.svg" alt="RealEstateCare Logo" />
			</router-link>
			<div class="icon-container">
				<ion-icon :icon="notifications" class="header-icon"></ion-icon>
				<ion-icon :icon="settings" class="header-icon"></ion-icon>
			</div>
		</div>
	</header>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { notifications, settings } from "ionicons/icons";

export default {
	name: "AppHeader",
	components: {
		IonIcon,
	},
	data() {
		return {
			notifications,
			settings,
		};
	},
};
</script>

<style scoped>
.header-container {
	background: #161d21;
	display: flex;
	justify-content: space-between;
	block-size: 56px;
}
#page-title {
	color: #fff;
	font-size: 2rem;
}
.icon-container {
	display: flex;
	align-items: center;
}
ion-icon {
	color: #fff;
	padding-inline-end: 1rem;
	font-size: 36px;
}
ion-icon:active {
	color: #d1d5db;
	scale: 1.05;
	cursor: pointer;
	transition-property: color, background-color, border-color, outline-color, text-decoration-color,
		fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 200ms;
}
img {
	filter: invert(100%);
	block-size: 56px;
	padding: 0.5rem;
}
</style>
