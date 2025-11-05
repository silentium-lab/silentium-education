import { CRUD } from "@/modules/app/CRUD";
import { omit, partialRight } from "lodash-es";
import { Any, Applied, Event, LateShared, Of, Shared } from "silentium";
import {
  Branch,
  Constant,
  Detached,
  Loading,
  Shot,
  Task,
  Template,
} from "silentium-components";
import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { SplitPart } from "@/modules/string/SplitPart";
import { $title, $url, i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { ArticleForm } from "@/pages/Admin/ArticleForm";

export function ArticleEdit() {
  return Event<string>((transport) => {
    i18n.tr("Article").event($title);

    const $localUrl = Detached($url);
    const $id = SplitPart($localUrl, Of("/"), Of(3));
    const $article = Shared(CRUD(Of("private/articles")).entity($id).result());
    const $clicked = LateShared();
    const $form = LateShared<ArticleType>();

    const $formUpdated = Shared(
      CRUD(Of("private/articles")).updated($id, Shot($form, $clicked)).result(),
    );
    const formUpdateLoadingSrc = Any(
      Loading($clicked, $formUpdated),
      Of(false),
    );

    Constant(
      {
        type: "success",
        content: "Успешно изменено",
      } as const,
      $formUpdated,
    ).event($notification);

    Applied(
      Any($article, Task($formUpdated)),
      partialRight(omit, ["_id"]),
    ).event($form);

    const t = Template();
    t.template(`<div class="article">
			${t.var(Link(Of("/admin/articles"), i18n.tr("Articles"), Of("underline")))}
        <h1 class="title-1">${t.var($title)}</h1>
		<div class="mb-2">
			<div>
				<b>id: </b>
				${t.var($id)}
			</div>
			${t.var(ArticleForm($form))}
		</div>
		${t.var(
      Button(
        Branch(formUpdateLoadingSrc, Of("Сохраняем..."), Of("Сохранить")),
        Of("btn"),
        $clicked,
      ),
    )}
      </div>`);
    t.event(transport);

    return () => {
      t.destroy();
    };
  });
}
