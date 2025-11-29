import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { $title, $url, i18n } from "@/store";
import { Any, LateShared, Local, Of, Primitive, Shared } from "silentium";
import {
  Branch,
  Constant,
  Loading,
  Path,
  Record,
  Shot,
  Task,
  Template,
} from "silentium-components";

export function SectionNew() {
  $title.chain(i18n.tr("Create section"));
  const config = SectionConfig();

  const clickedSrc = LateShared();
  const formSrc = LateShared({
    title: "",
    content: "",
  });

  const $formUpdated = Shared<any>(
    ServerResponse(CRUD(config.model).created(Shot(formSrc, clickedSrc))),
  );
  const formUpdateLoadingSrc = Any(
    Loading(clickedSrc, $formUpdated),
    Of(false),
  );

  const insertedIdSrc = Path($formUpdated, Of("insertedId"));
  $url.chain(
    Task(
      Template(
        Of(`${config.path}/$id/`),
        Record({
          $id: insertedIdSrc,
        }),
      ),
      900,
    ),
  );

  $notification.chain(
    Constant(
      {
        type: "success",
        content: Primitive(i18n.tr("Created success")).primitiveWithException(),
      } as const,
      $formUpdated,
    ),
  );

  return Template(
    (t) => `<div class="article">
      ${t.var(Link(Of(config.path), i18n.tr("Sections"), Of("underline")))}
      <h1 class="title-1">${t.var(Local($title))}</h1>
      ${t.var(SectionForm(formSrc))}
      ${t.var(
        Button(
          Branch(formUpdateLoadingSrc, i18n.tr("Saving..."), i18n.tr("Save")),
          Of("btn"),
          clickedSrc,
        ),
      )}
    </div>`,
  );
}
