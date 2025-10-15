import { Applied, type ConstructorType, type EventType, Of } from "silentium";
import { backendCrudSrc } from "../bootstrap";

export const settingsModels = {
	/**
	 * Application is configured
	 */
	hasSettings(transport: ConstructorType): EventType<boolean> {
		const settingsSrc = backendCrudSrc
			.ofModelName(Of("configured"))
			.custom<{configured: boolean}>(transport);

		return Applied(settingsSrc, (s) => s.configured);
	},
};
