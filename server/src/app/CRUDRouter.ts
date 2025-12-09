import { IncomingMessage } from "http";
import {
  Any,
  Catch,
  Chainable,
  Late,
  MessageType,
  Of,
  Race,
  Shared,
} from "silentium";
import {
  Detached,
  Path,
  Record,
  Router,
  Shot,
  Tick,
} from "silentium-components";
import { NotFoundSrc } from "../../store";
import { Created } from "../modules/mongo/Created";
import { Entity } from "../modules/mongo/Entity";
import { List } from "../modules/mongo/List";
import { Removed } from "../modules/mongo/Removed";
import { Updated } from "../modules/mongo/Updated";
import { Query } from "../modules/string/Query";
import { UrlFromMessage } from "../modules/string/UrlFromMessage";
import { Truncated } from "../modules/structure/Truncated";
import { UrlParams } from "../modules/string/UrlParams";
import { OnlyKnownFields } from "../modules/validation/OnlyKnownFIelds";

export const CRUDRouter = (
  req: MessageType<IncomingMessage>,
  baseUrl: string,
  collectionName: string,
): MessageType<string> => {
  const detachedReq = Detached<any>(req);
  return Router<any>(
    Query(detachedReq),
    Of([
      {
        pattern: `^GET:${baseUrl}(\\?[^#]*)?$`,
        patternFlags: "g",
        message: () => {
          const $error = Late();
          const $url = UrlFromMessage(detachedReq);
          const $filter = OnlyKnownFields(Race(UrlParams($url), Tick(Of({}))), [
            "title",
          ]);
          Chainable($error).chain(Path(Catch($filter) as any, "message"));
          const $data = Shared(List(collectionName, $filter));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot<unknown>(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        message: () => {
          const $url = UrlFromMessage(detachedReq);
          const $error = Late();
          const $data = Shared(Entity($url, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^POST:${baseUrl}$`,
        message: () => {
          const $error = Late();
          const $data = Shared(Created(detachedReq, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        message: () => {
          const $error = Late();
          const $data = Shared(Updated(detachedReq, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^DELETE:${baseUrl}.*$`,
        message: () => {
          const $error = Late();
          const $url = UrlFromMessage(detachedReq);
          const $data = Shared(Removed($url, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
    ]),
    NotFoundSrc,
  );
};
