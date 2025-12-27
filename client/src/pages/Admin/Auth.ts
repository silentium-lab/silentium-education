import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { InputId } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { html } from "@/modules/plugins/lang/html";
import { Mount } from "@/modules/render/Mount";
import { Tr } from "@/store";
import { MinLength, RequiredTr } from "@/validations";
import { startAuthentication } from "@simplewebauthn/browser";
import {
  Computed,
  Context,
  Late,
  MessageType,
  Of,
  Process,
  Shared,
} from "silentium";
import { Branch, Record, Shot, Template } from "silentium-components";
import {
  Validated,
  ValidationErrors,
  ValidationItems,
} from "silentium-validation";

export function Auth() {
  Context("title").chain(Tr("Auth"));
  const $username = Late<string>("");
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

  const $errors = ValidationErrors(
    Computed(
      ValidationItems,
      Record({
        name: $username,
      }),
      {
        name: [RequiredTr, MinLength(3)],
      },
    ),
  );
  const $validated = Computed(Validated, $errors);

  return Template(
    (t) =>
      html`<div class="article">
        <h1 class="title-1">${t.escaped(Tr("Sign in"))}</h1>
        <div class="mb-2">
          <label for="login"> ${t.escaped(Tr("Login"))} </label>
          <input
            id="login"
            class="${t.escaped(
              InputId($username),
            )} border-1 p-2 rounded-sm w-full"
            name="username"
          />
          ${t.raw(Mount(Error("name", $errors)))}
        </div>
        <div class="mb-2">
          ${t.raw(
            Mount(
              Button(
                Tr("Sign in"),
                Of("btn"),
                $authenticated,
                Branch($validated, "", "disabled"),
              ),
            ),
          )}
        </div>
      </div>`,
  );
}
