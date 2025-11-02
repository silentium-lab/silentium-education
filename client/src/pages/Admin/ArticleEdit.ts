import { omit, partialRight } from "lodash-es";
import {
  Any,
  Applied,
  Event,
  LateShared,
  Of,
  Shared,
  TransportDestroyable,
} from "silentium";
import {
  Branch,
  Constant,
  Detached,
  Loading,
  Shot,
  Task,
  Template,
  ToJson,
} from "silentium-components";
import {
  backendCrudSrc,
  backendTransport,
  notificationSrc,
} from "../../bootstrap";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { SplitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";
import type { ArticleType } from "../../types/ArticleType";
import { ArticleForm } from "./ArticleForm";

export function ArticleEdit() {
  return Event<string>((transport) => {
    const $title = i18n.tr("Article");
    $title.event(titleSrc);

    const backendTransportInstance = TransportDestroyable(backendTransport);

    const $localUrl = Detached(urlSrc);
    const $id = SplitPart($localUrl, Of("/"), Of(3));
    const $article = Shared(
      backendCrudSrc
        .ofModelName(Of("private/articles"))
        .entity(backendTransportInstance, $id),
    );
    const $clicked = LateShared();
    const $form = LateShared<ArticleType>();

    const $formUpdated = Shared(
      backendCrudSrc
        .ofModelName(Of("private/articles"))
        .updated(backendTransportInstance, $id, ToJson(Shot($form, $clicked))),
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
    ).event(notificationSrc);

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
        $clicked.use,
      ),
    )}
      </div>`);
    t.event(transport);

    return () => {
      backendTransportInstance.destroy();
      t.destroy();
    };
  });
}
