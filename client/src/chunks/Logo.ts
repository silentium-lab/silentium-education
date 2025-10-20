import { Of } from "silentium";
import { Link } from "../components/Link";

export const logoSrc = Link(
  Of("/"),
  Of('<span class="text-logo no-underline">SILENTIUM</span>'),
);
