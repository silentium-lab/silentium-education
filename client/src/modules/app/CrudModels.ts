import { type ConstructorType, type EventType, Of } from "silentium";
import { FromJson, Path, RecordOf, Template } from "silentium-components";

class ModuleCrudModels {
	public constructor(
		private responsePathSrc: EventType<string>,
		private modelNameSrc: EventType<string> = Of("any"),
	) {}

	public ofModelName(modelNameSrc: EventType<string>) {
		return new ModuleCrudModels(this.responsePathSrc, modelNameSrc);
	}

	public list(
		modelTransport: ConstructorType<any, any>,
		searchSrc?: EventType<Record<string, unknown>>,
	) {
		return Path<unknown[]>(
			FromJson(
				modelTransport(
					RecordOf({
						url: Template(
							Of("/$1"),
							RecordOf({
								$1: this.modelNameSrc,
							}),
						).value,
						method: Of("GET"),
						query: searchSrc ?? Of({}),
					}),
				),
			),
			this.responsePathSrc,
		);
	}

	public entity(
		modelTransport: ConstructorType<any, any>,
		idSrc: EventType<string>,
	) {
		return Path(
			FromJson(
				modelTransport(
					RecordOf({
						url: Template(
							Of("/$1/$2/"),
							RecordOf({
								$1: this.modelNameSrc,
								$2: idSrc,
							}),
						).value,
						method: Of("GET"),
					}),
				),
			),
			this.responsePathSrc,
		);
	}

	public created(
		modelTransport: ConstructorType<any, any>,
		formSrc: EventType<string>,
	): EventType<Record<string, unknown>> {
		return Path(
			FromJson(
				modelTransport(
					RecordOf({
						url: Template(
							Of("/$1"),
							RecordOf({
								$1: this.modelNameSrc,
							}),
						).value,
						method: Of("POST"),
						body: formSrc,
					}),
				),
			),
			this.responsePathSrc,
		);
	}

	public updated(
		modelTransport: ConstructorType<any, any>,
		idSrc: EventType<string>,
		formSrc: EventType<string>,
	) {
		return Path(
			FromJson(
				modelTransport(
					RecordOf({
						url: Template(
							Of("/$1/$2/"),
							RecordOf({
								$1: this.modelNameSrc,
								$2: idSrc,
							}),
						).value,
						method: Of("PUT"),
						body: formSrc,
					}),
				),
			),
			this.responsePathSrc,
		);
	}

	public deleted(
		modelTransport: ConstructorType<any, any>,
		idSrc: EventType<string>,
	) {
		return Path(
			FromJson(
				modelTransport(
					RecordOf({
						url: Template(
							Of("/$1/$2/"),
							RecordOf({
								$1: this.modelNameSrc,
								$2: idSrc,
							}),
						).value,
						method: Of("DELETE"),
					}),
				),
			),
			this.responsePathSrc,
		);
	}
}

export function CrudModels(
	responsePathSrc: EventType<string>,
	modelNameSrc: EventType<string> = Of("any"),
) {
	return new ModuleCrudModels(responsePathSrc, modelNameSrc);
}
