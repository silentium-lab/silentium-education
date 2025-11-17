import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { $title, i18n } from "@/store";
import { startAuthentication } from "@simplewebauthn/browser";
import {
  FromPromise,
  LateShared,
  Message,
  Of,
  Primitive,
  Shared,
  Transport,
} from "silentium";
import { Record, Shot, Template, Transaction } from "silentium-components";
import { Log } from "silentium-web-api";

export function Auth() {
  const $username = LateShared();
  const $authenticated = LateShared();

  const $loginStart = Shared(
    ServerResponse(
      CRUD(Of("auth/login/start"))
        .created(Shot(Record({ username: $username }), $authenticated))
        .result(),
    ),
  );
  const $fidoAuthData = Transaction($loginStart, (data) => {
    return FromPromise(
      startAuthentication({
        optionsJSON: Primitive(data).primitiveWithException() as any,
      }),
      Log("fido auth error"),
    );
  });

  const $loginFinish = Shared(
    ServerResponse(
      CRUD(Of("auth/login/finish"))
        .created(
          Record({
            data: $fidoAuthData,
            username: $username,
          }),
        )
        .result(),
    ),
  );

  $authenticated.to(Log("authenticated"));
  $loginFinish.to(Log("loginFinish"));

  $loginFinish.to(
    Transport(() => {
      location.reload();
    }),
  );

  return Message((transport) => {
    const title = i18n.tr("Auth");
    title.to($title);
    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">${t.var(title)}</h1>
      <div class="mb-2">
        <input class="${t.var(Input($username))} border-1 p-2 rounded-sm w-full" name="username" />
      </div>
      <div class="mb-2">
        ${t.var(Button(Of("Войти"), Of("btn"), $authenticated))}
      </div>
		</div>`);
    t.to(transport);
  });
}
