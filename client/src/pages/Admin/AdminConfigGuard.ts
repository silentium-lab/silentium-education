import {
    constructorDestroyable,
    destructor,
    type ConstructorType,
    type EventType,
} from "silentium";
import { branchLazy } from "silentium-components";
import { backendTransport, hasSettingsSrc } from "../../bootstrap";
import { Configuration } from "./Configuration";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard(
	AdminLazy: ConstructorType<[], EventType<string>>,
): EventType<string> {
	return (user) => {
		const transport = constructorDestroyable(backendTransport);
		const r = destructor(branchLazy(hasSettingsSrc.event, AdminLazy, Configuration));
		r.event(user);

		return () => {
			transport.destroy();
			r.destroy();
		};
	};
}
