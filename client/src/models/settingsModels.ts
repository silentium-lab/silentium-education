import { Applied, type ConstructorType, type EventType, Of } from "silentium";
import { backendCrudSrc } from "../bootstrap";

export const settingsModels = {
	/**
	 * Application is configured
	 */
	hasSettings(transport: ConstructorType): EventType<boolean> {
		const settingsSrc = backendCrudSrc
			.ofModelName(Of("settings"))
			.list(transport, Of({}));

		return Applied(settingsSrc, (s) => s.length > 0);
	},
};
