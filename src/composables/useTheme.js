import { ref, onMounted } from "vue";

const mode = ref("dark");

export function useTheme() {
	const apply = (m) => {
		mode.value = m;
		document.body.classList.toggle("dark", m === "dark");
		localStorage.setItem("theme", m);
	};

	const toggleTheme = () => {
		apply(mode.value === "dark" ? "light" : "dark");
	};

	onMounted(() => {
		const saved = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		apply(saved ?? (prefersDark ? "dark" : "light"));
	});

	return { mode, toggleTheme, apply };
}
