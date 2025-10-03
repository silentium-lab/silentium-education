import { of, shared } from "silentium";
import { router } from "silentium-components";
import { About } from "./pages/About";
import { Admin } from "./pages/Admin";
import { Blog } from "./pages/Blog";
import { Documentation } from "./pages/Documentation";
import { home, Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
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
			template: () => new About(),
		},
		{
			pattern: "/documentation",
			template: () => new Documentation(),
		},
		{
			pattern: "/blog",
			template: () => new Blog(),
		},
		{
			pattern: "/admin.*",
			template: () => new Admin(),
		},
	]),
	() => new NotFound(),
));
