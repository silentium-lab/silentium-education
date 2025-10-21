import { IncomingMessage } from "http";
import { Db, ObjectId } from "mongodb";
import getRawBody from "raw-body";
import { ConstructorType, EventType, Of, Primitive } from "silentium";
import { Detached, Path, Router, ToJson } from "silentium-components";
import { NotFoundSrc } from "../../store";
import { Query } from "../modules/string/Query";
import { SplitPart } from "../modules/string/SplitPart";

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
          dbTransport()(async (db) => {
            const collection = db.collection(collectionName);
            const all = await collection.find().toArray();
            ToJson(
              Of({
                message: "ok",
                data: all,
              }),
            )(o);
          });
        },
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        template: (): EventType<string> => (o) => {
          dbTransport()(async (db) => {
            try {
              const idSync = Primitive(
                SplitPart(
                  Path(detachedReq as EventType<any>, Of("url")),
                  Of("/"),
                  Of(3),
                ),
              );
              console.log(idSync.primitive());
              const collection = db.collection(collectionName);
              const all = await collection.findOne({
                _id: new ObjectId(idSync.primitiveWithException()),
              });
              ToJson(
                Of({
                  message: "ok",
                  data: all,
                }),
              )(o);
            } catch {
              ToJson(
                Of({
                  message: "unable to find entity",
                }),
              )(o);
            }
          });
        },
      },
      {
        pattern: `^POST:${baseUrl}$`,
        template: (): EventType<string> => (o) => {
          dbTransport()(async (db) => {
            try {
              const collection = db.collection(collectionName);
              const reqSync = Primitive(detachedReq);
              const body = await getRawBody(reqSync.primitiveWithException());
              const bodyText = body.toString("utf8");
              const result = await collection.insertOne(JSON.parse(bodyText));
              ToJson(
                Of({
                  message: "created",
                  data: result,
                }),
              )(o);
            } catch {
              ToJson(
                Of({
                  message: "unable to create",
                }),
              )(o);
            }
          });
        },
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        template: (): EventType<string> => (o) => {
          dbTransport()(async (db) => {
            try {
              const idSync = Primitive(
                SplitPart(Path(detachedReq, Of("url")), Of("/"), Of(3)),
              );
              const collection = db.collection(collectionName);
              const reqSync = Primitive(detachedReq);
              const body = await getRawBody(reqSync.primitiveWithException());
              const bodyText = body.toString("utf8");
              const all = await collection.findOneAndUpdate(
                { _id: new ObjectId(idSync.primitiveWithException()) },
                { $set: JSON.parse(bodyText) },
                { returnDocument: "after" },
              );
              ToJson(
                Of({
                  message: "ok",
                  data: all,
                }),
              )(o);
            } catch {
              ToJson(
                Of({
                  message: "unable to find entity",
                }),
              )(o);
            }
          });
        },
      },
      {
        pattern: `^DELETE:${baseUrl}/.+/$`,
        template: (): EventType<string> => (o) => {
          dbTransport()(async (db) => {
            try {
              const idSync = Primitive(
                SplitPart(Path(detachedReq, Of("url")), Of("/"), Of(3)),
              );
              const collection = db.collection(collectionName);
              const all = await collection.deleteOne({
                _id: new ObjectId(idSync.primitiveWithException()),
              });
              ToJson(
                Of({
                  message: "ok",
                  data: all,
                }),
              )(o);
            } catch {
              ToJson(
                Of({
                  message: "unable to delete",
                }),
              )(o);
            }
          });
        },
      },
    ]),
    NotFoundSrc,
  );
};
