import { all, type EventType } from "silentium";
import { authenticatedSrc, urlSrc } from "../store";

export const routePrivate = (
	baseSrc: EventType<string>,
	loginRoute: string = "/admin",
): EventType<string> => {
	return (u) => {
		all(
			authenticatedSrc.event,
			baseSrc,
		)(([auth, content]) => {
			if (!auth) {
				setTimeout(() => {
					urlSrc.use(loginRoute);
				});
			} else {
				u(content);
			}
		});
	};
};
