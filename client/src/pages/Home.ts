import { $title, Tr } from "@/store";
import { Context } from "silentium";
import { Template } from "silentium-components";

export function Home() {
  $title.chain(Tr("home"));
  const $articles = Context("request", {
    method: "get",
    model: "articles",
  });
  return Template(
    (t) => `<section class="article">
	  <h1 class="title-1">
	    Silentium
	  </h1>
	  <div>
		${t.var($articles)}
	  </div>
	</section>`,
  );
}
