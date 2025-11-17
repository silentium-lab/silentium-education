import { NewContext } from "@/modules/context/Context";
import { MessageType, Of, RPC } from "silentium";
import { Concatenated, Record } from "silentium-components";

/**
 * Represents a set of CRUD operations
 * that are sent for execution to the transport
 * named $transport
 */
export function CRUD(
  $model: MessageType<string>,
  $transport: MessageType<string> = Of("request"),
) {
  return new CRUDImpl($model, $transport);
}

class CRUDImpl {
  public constructor(
    private $model: MessageType<string>,
    private $transport: MessageType<string>,
  ) {}

  /**
   * List of entities from external system
   */
  public list<R = unknown>($search?: MessageType<Record<string, unknown>>) {
    const $r = RPC<R>(
      Record({
        transport: this.$transport,
        method: "get",
        params: Record({
          model: this.$model,
          query: $search ?? {},
          credentials: "include",
        }),
      }),
    );

    $r.error().pipe(NewContext("error"));

    return $r;
  }

  /**
   * One entity from external system
   */
  public entity<R = unknown>($id: MessageType<string>) {
    const $r = RPC<R>(
      Record({
        transport: this.$transport,
        method: "get",
        params: Record({
          model: Concatenated([this.$model, Of("/"), $id, Of("/")]),
          credentials: "include",
        }),
      }),
    );

    $r.error().pipe(NewContext("error"));

    return $r;
  }

  /**
   * Custom query
   */
  public custom<R = unknown>($search?: MessageType<Record<string, unknown>>) {
    const $r = RPC<R>(
      Record({
        transport: this.$transport,
        method: "get",
        params: Record({
          model: this.$model,
          query: $search ?? {},
          credentials: "include",
        }),
      }),
    );

    $r.error().pipe(NewContext("error"));

    return $r;
  }

  /**
   * Creating a new entity
   */
  public created<R = unknown>($form: MessageType) {
    const $r = RPC<R>(
      Record({
        transport: this.$transport,
        method: "post",
        params: Record({
          model: this.$model,
          body: $form,
          credentials: "include",
        }),
      }),
    );

    $r.error().pipe(NewContext("error"));

    return $r;
  }

  /**
   * Updating an entity
   */
  public updated<R = unknown>($id: MessageType<string>, $form: MessageType) {
    const $r = RPC<R>(
      Record({
        transport: this.$transport,
        method: "put",
        params: Record({
          model: Concatenated([this.$model, Of("/"), $id, Of("/")]),
          body: $form,
          credentials: "include",
        }),
      }),
    );

    $r.error().pipe(NewContext("error"));

    return $r;
  }

  /**
   * Deleting an entity
   */
  public deleted<R = unknown>($id: MessageType<string>) {
    const $r = RPC<R>(
      Record({
        transport: this.$transport,
        method: "delete",
        params: Record({
          model: this.$model,
          query: Record({
            id: $id,
          }),
          credentials: "include",
        }),
      }),
    );

    $r.error().pipe(NewContext("error"));

    return $r;
  }
}
