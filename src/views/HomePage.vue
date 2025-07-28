<template>
	<base-layout>
		<div class="home-container">
			<section class="menu-container">
				<router-link to="/assigned-reports" class="menu-item">
					<ion-icon :icon="bookmarkOutline" class="menu-icon" />
					<span class="menu-title">Toegewezen</span>
				</router-link>
				<router-link to="/completed-inspections" class="menu-item">
					<ion-icon :icon="checkmarkCircle" class="menu-icon" />
					<span class="menu-title">Uitgevoerd</span>
				</router-link>
				<router-link to="/knowledge-base" class="menu-item">
					<ion-icon :icon="apps" class="menu-icon" />
					<span class="menu-title">Kennisbank</span>
				</router-link>
				<router-link to="/settings-page" class="menu-item">
					<ion-icon :icon="settings" class="menu-icon" />
					<span class="menu-title">Instellingen</span>
				</router-link>
			</section>
		</div>
	</base-layout>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { bookmarkOutline, checkmarkCircle, apps, settings } from "ionicons/icons";

export default {
	name: "HomePage",
	components: {
		IonIcon,
	},
	data() {
		return {
			bookmarkOutline,
			checkmarkCircle,
			apps,
			settings,
		};
	},
};
</script>

<style scoped>
.home-container {
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}

.menu-container {
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1.5rem;
	padding: 1rem;
}

.menu-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	padding-inline: 2.5rem;
	box-shadow: 0 15px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.15);
	border-radius: 0.5rem; /* 8px */
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 200ms;
}

.menu-item:hover {
	transform: scale(1.05);
	box-shadow: 0 15px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.menu-item:active {
	transform: scale(0.95);
}

.menu-icon {
	color: var(--menu-icon);
	font-size: 60px;
	line-height: 1;
	font-weight: 700;
	@media (width >= 640px) {
		font-size: 72px;
	}
	@media (width >= 768px) {
		font-size: 128px;
	}
}

.menu-title {
	color: var(--text);
	text-align: center;
	font-size: 18px;
	line-height: 1.5556;
	font-weight: 700;
	@media (width >= 640px) {
		font-size: 20px;
		line-height: 1.4;
	}
	@media (width >= 768px) {
		font-size: 24px;
		line-height: 1.3333;
	}
}
</style>
