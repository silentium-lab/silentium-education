import { IncomingMessage } from "http";
import { Db } from "mongodb";
import { Any, Catch, ConstructorType, EventType, Late, Of } from "silentium";
import { Detached, RecordOf, Router, ToJson } from "silentium-components";
import { NotFoundSrc } from "../../store";
import { Created } from "../modules/mongo/Created";
import { Entity } from "../modules/mongo/Entity";
import { List } from "../modules/mongo/List";
import { Removed } from "../modules/mongo/Removed";
import { Updated } from "../modules/mongo/Updated";
import { Query } from "../modules/string/Query";
import { UrlFromMessage } from "../modules/string/UrlFromMessage";

export const CRUDRouter = (
  req: EventType<IncomingMessage>,
  dbTransport: ConstructorType<[], EventType<Db>>,
  baseUrl: string,
  collectionName: string,
): EventType<string> => {
  const detachedReq = Detached<any>(req);
  return Router<string>(
    Query(detachedReq),
    Of([
      {
        pattern: `^GET:${baseUrl}$`,
        template: (): EventType<string> => (o) => {
          const error = Late();
          ToJson(
            RecordOf({
              data: Any(
                Catch(List(dbTransport(), collectionName), error.use),
                Of(null),
              ),
              error: Any(error.event, Of(null)),
            }),
          )(o);
        },
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        template: (): EventType<string> => (o) => {
          const $url = UrlFromMessage(detachedReq);
          const error = Late();
          ToJson(
            RecordOf({
              data: Any(
                Catch(Entity(dbTransport(), $url, collectionName), error.use),
                Of(null),
              ),
              error: Any(error.event, Of(null)),
            }),
          )(o);
        },
      },
      {
        pattern: `^POST:${baseUrl}$`,
        template: (): EventType<string> => (o) => {
          const error = Late();
          ToJson(
            RecordOf({
              data: Any(
                Catch(
                  Created(dbTransport(), detachedReq, collectionName),
                  error.use,
                ),
                Of(null),
              ),
              error: Any(error.event, Of(null)),
            }),
          )(o);
        },
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        template: (): EventType<string> => (o) => {
          const error = Late();
          ToJson(
            RecordOf({
              data: Any(
                Catch(
                  Updated(dbTransport(), detachedReq, collectionName),
                  error.use,
                ),
                Of(null),
              ),
              error: Any(error.event, Of(null)),
            }),
          )(o);
        },
      },
      {
        pattern: `^DELETE:${baseUrl}/.+/$`,
        template: (): EventType<string> => (o) => {
          const error = Late();
          const $url = UrlFromMessage(detachedReq);
          ToJson(
            RecordOf({
              data: Any(
                Catch(Removed(dbTransport(), $url, collectionName), error.use),
                Of(null),
              ),
              error: Any(error.event, Of(null)),
            }),
          )(o);
        },
      },
    ]),
    NotFoundSrc,
  );
};
