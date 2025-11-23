import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { $title, i18n } from "@/store";
import { startAuthentication } from "@simplewebauthn/browser";
import { LateShared, Local, Message, Of, Primitive, Shared } from "silentium";
import { Record, Shot, Template } from "silentium-components";
import { Log } from "silentium-web-api";

export function Auth() {
  const $username = LateShared<string>();
  const $authenticated = LateShared();

  const $loginStart = Shared(
    ServerResponse(
      CRUD(Of("auth/login/start")).created(
        Shot(Record({ username: $username }), $authenticated),
      ),
    ),
  );
  const $fidoAuthData = $loginStart.then((data: any) => {
    return startAuthentication({
      optionsJSON: Primitive(data).primitiveWithException() as any,
    });
  });

  const $loginFinish = Shared(
    ServerResponse(
      CRUD(Of("auth/login/finish")).created(
        Record({
          data: $fidoAuthData,
          username: $username,
        }),
      ),
    ),
  );

  $authenticated.then(Log("authenticated"));
  $loginFinish.then(Log("loginFinish"));

  $loginFinish.then(() => {
    location.reload();
  });

  return Message<string>((transport) => {
    $title.chain(i18n.tr("Auth"));
    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">${t.var(Local($title))}</h1>
      <div class="mb-2">
        <input class="${t.var(Input($username))} border-1 p-2 rounded-sm w-full" name="username" />
      </div>
      <div class="mb-2">
        ${t.var(Button(Of("Войти"), Of("btn"), $authenticated))}
      </div>
		</div>`);
    t.then(transport);
  });
}
