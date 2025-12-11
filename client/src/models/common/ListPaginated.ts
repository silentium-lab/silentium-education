import { merge } from "lodash-es";
import {
  Any,
  Chainable,
  Computed,
  Late,
  MessageSourceType,
  New,
  Once,
} from "silentium";
import {
  Constant,
  Loading,
  OnlyChanged,
  Polling,
  Record,
  RecordTruncated,
  Tick,
} from "silentium-components";

export function ListPaginated(
  filterValues: () => any,
  listSrc: MessageSourceType,
  limit = 10,
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

  const $listFilter = Tick(
    Polling(
      Once(
        RecordTruncated(
          Computed(
            merge,
            New(() => ({})),
            $filter,
            Record({
              page: $page,
              limit,
            }),
          ),
          ["", null, undefined],
        ),
      ),
      Any($actualSearch, $reload),
    ),
  );

  const $loading = Loading(
    Any($actualSearch, $reload, $page),
    Any(listSrc, OnlyChanged($error)),
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
