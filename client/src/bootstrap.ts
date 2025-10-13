import {
	Applied,
	type EventType,
	type EventUserType,
	LateShared,
	Of,
	Shared,
} from "silentium";
import { FetchedData } from "silentium-web-api";
import { CrudModels } from "./modules/app/CrudModels";
import { errorSrc } from "./store";
import { settingsModels } from "./models/settingsModels";

export const backendTransport = (r: unknown, e: unknown, a: unknown) =>
	FetchedData(
		Applied(
			r as EventType<Record<string, unknown>>,
			(r: Record<string, unknown>) => {
				return {
					baseUrl: "http://localhost:4000",
					headers: {
						"Content-Type": "application/json",
					},
					...r,
				};
			},
		),
		(e as EventUserType) ?? errorSrc,
		a as EventType,
	);

export const backendCrudSrc = CrudModels(Of("data"));
export const notificationSrc = LateShared<{
	type: "error" | "success" | "info";
	content: string;
}>();

export const hasSettingsSrc = Shared(settingsModels.hasSettings(backendTransport));
