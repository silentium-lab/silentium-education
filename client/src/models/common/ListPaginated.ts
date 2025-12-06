import { Any, Chainable, Late, MessageSourceType, New } from "silentium";
import {
  Constant,
  Loading,
  OnlyChanged,
  Polling,
  Shot,
  Tick,
} from "silentium-components";

export function ListPaginated(
  filterValues: () => any,
  listSrc: MessageSourceType,
) {
  const $reload = Late();
  const $search = Late(1);
  const $reset = Late();
  const $filter = Late(filterValues());
  const $error = Late();

  Chainable($filter).chain(Polling(New(filterValues), $reset));
  const $page = Late(1);

  const $actualSearch = Any($search, Tick($reset));
  Chainable($page).chain(Constant(1, $actualSearch));

  // Полный объект фильтров для запроса
  const $listFilter = Tick(
    Shot(RecordTruncated($filter, ["", null]), Any([$actualSearch, $reload])),
  );

  const $loading = Loading(
    Any([$actualSearch, $reload, $page]),
    Any([listSrc, OnlyChanged($error)]),
  );

  return {
    $reload,
    $search,
    $reset,
    $filter,
    $page,
    $listFilter,
    $loading,
    $error,
  };
}
