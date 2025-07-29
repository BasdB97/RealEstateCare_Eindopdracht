export function getValue(value, fallback = "–") {
	if (value === null || value === undefined || value === "") {
		return fallback;
	}
	if (typeof value === "boolean") {
		return value ? "Ja" : "Nee";
	}
	return value;
}
