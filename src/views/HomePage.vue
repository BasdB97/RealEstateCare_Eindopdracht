<template>
	<base-layout>
		<div class="home-container">
			<section class="menu-container">
				<router-link to="/assigned-reports" class="menu-item">
					<ion-icon :icon="bookmarkOutline" class="menuIcon" />
					<span>Assigned Reports</span>
				</router-link>
				<router-link to="/completed-inspections" class="menu-item">
					<ion-icon :icon="checkmarkCircle" class="menuIcon" />
					<span>Completed Inspections</span>
				</router-link>
				<router-link to="/knowledge-base" class="menu-item">
					<ion-icon :icon="apps" class="menuIcon" />
					<span>Knowledge Base</span>
				</router-link>
				<router-link to="/settings-page" class="menu-item">
					<ion-icon :icon="settings" class="menuIcon" />
					<span>Settings</span>
				</router-link>
			</section>
		</div>
	</base-layout>
</template>

<script setup>
import BaseLayout from "../components/BaseLayout.vue";
import { IonIcon } from "@ionic/vue";
import { bookmarkOutline, checkmarkCircle, apps, settings } from "ionicons/icons";
</script>

<style scoped>
.home-container {
	display: flex;
	align-items: center;
	justify-items: center;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}

.menu-container {
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1.5rem;
	margin-block: 2rem;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 16px;
	margin-bottom: 12px;
	text-decoration: none;
	color: var(--ion-color-primary);
	border: 1px solid var(--ion-color-light);
	border-radius: 8px;
	transition: all 0.2s ease;
	color: white;
}

.menu-item:hover {
	background-color: var(--ion-color-light);
	transform: translateY(-2px);
}

.menuIcon {
	margin-right: 12px;
	font-size: 20px;
}
</style>
