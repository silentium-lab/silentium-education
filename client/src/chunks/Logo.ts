import { of } from "silentium";
import { link } from "../components/Link";

export const logoSrc = link(
	of("/"),
	of('<span class="text-logo no-underline">SILENTIUM</span>'),
);
