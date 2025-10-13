import { applied, type ConstructorType, type EventType, of } from "silentium";
import { backendCrudSrc } from "../bootstrap";

export const settingsModels = {
	/**
	 * Application is configured
	 */
	hasSettings(transport: ConstructorType): EventType<boolean> {
		const settingsSrc = backendCrudSrc
			.ofModelName(of("settings"))
			.list(transport, of({}));

		return applied(settingsSrc, (s) => s.length > 0);
	},
};
