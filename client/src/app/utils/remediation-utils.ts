import type { RemediationCategory } from "@app/client";

export const remediationCategoryColor = (
	category: RemediationCategory,
): "green" | "blue" | "gold" | "grey" | "red" => {
	switch (category) {
		case "vendor_fix":
			return "green";
		case "workaround":
			return "blue";
		case "mitigation":
			return "gold";
		case "no_fix_planned":
		case "will_not_fix":
			return "grey";
		case "none_available":
			return "red";
	}
};

export const formatRemediationCategory = (
	category: RemediationCategory,
): string => {
	switch (category) {
		case "vendor_fix":
			return "Vendor Fix";
		case "workaround":
			return "Workaround";
		case "mitigation":
			return "Mitigation";
		case "no_fix_planned":
			return "No Fix Planned";
		case "none_available":
			return "None Available";
		case "will_not_fix":
			return "Will Not Fix";
	}
};
