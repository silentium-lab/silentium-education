import { partial } from "lodash-es";
import { of, shared } from "silentium";
import { router } from "silentium-components";
import { about } from "./pages/About";
import { admin } from "./pages/Admin";
import { AdminConfigGuard } from "./pages/Admin/AdminConfigGuard";
import { blog } from "./pages/Blog";
import { documentation } from "./pages/Documentation";
import { home } from "./pages/Home";
import { notFound } from "./pages/NotFound";
import { urlSrc } from "./store";

export const routerSrc = shared(
	router(
		urlSrc.event,
		of([
			{
				pattern: "^/?$",
				template: home,
			},
			{
				pattern: "/about",
				template: about,
			},
			{
				pattern: "/documentation",
				template: documentation,
			},
			{
				pattern: "/blog",
				template: blog,
			},
			{
				pattern: "/admin.*",
				template: partial(AdminConfigGuard, admin),
			},
		]),
		notFound,
	),
);
