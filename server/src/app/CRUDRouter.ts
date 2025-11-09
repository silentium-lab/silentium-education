import { IncomingMessage } from "http";
import {
  Any,
  EventType,
  LateShared,
  Of,
  Shared,
  TransportEvent,
} from "silentium";
import { Detached, RecordOf, Router, Shot, ToJson } from "silentium-components";
import { NotFoundSrc } from "../../store";
import { Created } from "../modules/mongo/Created";
import { Entity } from "../modules/mongo/Entity";
import { List } from "../modules/mongo/List";
import { Removed } from "../modules/mongo/Removed";
import { Updated } from "../modules/mongo/Updated";
import { Query } from "../modules/string/Query";
import { UrlFromMessage } from "../modules/string/UrlFromMessage";
import { Truncated } from "../modules/structure/Truncated";

export const CRUDRouter = (
  req: EventType<IncomingMessage>,
  baseUrl: string,
  collectionName: string,
): EventType<string> => {
  const detachedReq = Detached<any>(req);
  return Router<string>(
    Query(detachedReq),
    Of([
      {
        pattern: `^GET:${baseUrl}$`,
        event: TransportEvent(() => {
          const $error = LateShared();
          const $data = Shared(List(collectionName, $error));
          return ToJson(
            Truncated(
              RecordOf({
                data: Any($data, Shot<unknown>(Of(""), $error)),
                error: Any($error, Shot(Of(""), $data)),
              }),
              [""],
            ),
          );
        }),
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const $url = UrlFromMessage(detachedReq);
          const $error = LateShared();
          const $data = Shared(Entity($url, collectionName, $error));
          return ToJson(
            Truncated(
              RecordOf({
                data: Any($data, Shot(Of(""), $error)),
                error: Any($error, Shot(Of(""), $data)),
              }),
              [""],
            ),
          );
        }),
      },
      {
        pattern: `^POST:${baseUrl}$`,
        event: TransportEvent(() => {
          const $error = LateShared();
          const $data = Shared(Created(detachedReq, collectionName, $error));
          return ToJson(
            Truncated(
              RecordOf({
                data: Any($data, Shot(Of(""), $error)),
                error: Any($error, Shot(Of(""), $data)),
              }),
              [""],
            ),
          );
        }),
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const $error = LateShared();
          const $data = Shared(Updated(detachedReq, collectionName, $error));
          return ToJson(
            Truncated(
              RecordOf({
                data: Any($data, Shot(Of(""), $error)),
                error: Any($error, Shot(Of(""), $data)),
              }),
              [""],
            ),
          );
        }),
      },
      {
        pattern: `^DELETE:${baseUrl}.*$`,
        event: TransportEvent(() => {
          const $error = LateShared();
          const $url = UrlFromMessage(detachedReq);
          const $data = Shared(Removed($url, collectionName, $error));
          return ToJson(
            Truncated(
              RecordOf({
                data: Any($data, Shot(Of(""), $error)),
                error: Any($error, Shot(Of(""), $data)),
              }),
              [""],
            ),
          );
        }),
      },
    ]),
    NotFoundSrc,
  );
};
