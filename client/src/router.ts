import { of, shared } from "silentium";
import { router } from "silentium-components";
import { about } from "./pages/About";
import { admin } from "./pages/Admin";
import { blog } from "./pages/Blog";
import { documentation } from "./pages/Documentation";
import { home } from "./pages/Home";
import { notFound } from "./pages/NotFound";
import { urlSrc } from "./store";

export const routerSrc = shared(router(
	urlSrc.value,
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
			template: admin,
		},
	]),
	notFound,
));
