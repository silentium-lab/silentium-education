import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { $title, Tr } from "@/store";
import { startAuthentication } from "@simplewebauthn/browser";
import { Late, MessageType, Of, Process, Shared } from "silentium";
import { Record, Shot, Template } from "silentium-components";

export function Auth() {
  $title.chain(Tr("Auth"));
  const $username = Late<string>();
  const $authenticated = Late();

  const $loginStart = Shared(
    ServerResponse(
      CRUD(Of("auth/login/start")).created(
        Shot(Record({ username: $username }), $authenticated),
      ),
    ),
  );
  const $authData = Shared(
    Process($loginStart, (data: any) => {
      return startAuthentication({
        optionsJSON: data,
      }) as MessageType;
    }),
  );

  const $loginFinish = Shared(
    ServerResponse(
      CRUD(Of("auth/login/finish")).created(
        Record({
          data: $authData,
          username: $username,
        }),
      ),
    ),
  );

  $loginFinish.then(() => {
    location.reload();
  });

  return Template(
    (t) => `<div class="article">
      <h1 class="title-1">${t.var(Tr("Sign in"))}</h1>
      <div class="mb-2">
        <label for="login">
          ${t.var(Tr("Login"))}
        </login>
        <input id="login" class="${t.var(Input($username))} border-1 p-2 rounded-sm w-full" name="username" />
      </div>
      <div class="mb-2">
        ${t.var(Button(Tr("Sign in"), Of("btn"), $authenticated))}
      </div>
    </div>`,
  );
}
