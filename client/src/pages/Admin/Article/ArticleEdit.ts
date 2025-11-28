import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { SplitPart } from "@/modules/string/SplitPart";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { $title, $url, i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { omit, partialRight } from "lodash-es";
import {
  Any,
  Applied,
  LateShared,
  Local,
  Message,
  MessageType,
  Of,
  Shared,
} from "silentium";
import {
  Branch,
  Constant,
  Detached,
  Loading,
  Shot,
  Task,
  Template,
} from "silentium-components";

export function ArticleEdit() {
  return Message<string>((transport) => {
    $title.chain(i18n.tr("Article"));

    const $localUrl = Detached($url);
    const $id = Shared(SplitPart($localUrl, Of("/"), Of(3)));
    const $article = Shared(
      ServerResponse(CRUD(Of("private/articles")).entity($id)),
    );
    const $clicked = LateShared();
    const $form = LateShared<ArticleType>();

    const $formUpdated = Shared(
      ServerResponse(
        CRUD(Of("private/articles")).updated($id, Shot($form, $clicked)),
      ),
    );
    const $formUpdateLoading = Any(Loading($clicked, $formUpdated), false);

    $notification.chain(
      Constant(
        {
          type: "success",
          content: "Успешно изменено",
        } as const,
        $formUpdated,
      ),
    );

    $form.chain(
      <MessageType<ArticleType>>(
        Applied(Any($article, Task($formUpdated)), partialRight(omit, ["_id"]))
      ),
    );

    const t = Template();
    t.template(`<div class="article">
			${t.var(Link(Of("/admin/articles"), i18n.tr("Articles"), Of("underline")))}
        <h1 class="title-1">${t.var(Local($title))}</h1>
        <div class="mb-2">
          <div>
            <b>id: </b>
            ${t.var($id)}
          </div>
          ${t.var(ArticleForm($form))}
        </div>
        ${t.var(
          Button(
            Branch($formUpdateLoading, Of("Сохраняем..."), Of("Сохранить")),
            Of("btn"),
            $clicked,
          ),
        )}
      </div>`);
    t.then(transport);

    return () => {
      t.destroy();
    };
  });
}
