import { OwnerType, SourceType, TheInformation } from "silentium";
import { Part, RecordOf } from "silentium-components";
import { Input } from "../../components/Input";
import { Mustache } from "../../modules/plugins/mustache/Mustache";
import { ArticleType } from "../../types/ArticleType";

export class ArticleForm extends TheInformation<string> {
    public constructor(private formSrc: SourceType<ArticleType>) {
        super(formSrc);
    }

    value(o: OwnerType<string>): this {
        new Mustache(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="{{ field.title }} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">Содержимое: </div>
				<textarea rows="20" class="{{ field.content }} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
		</div>`, new RecordOf({
			field: new RecordOf({
				title: new Input(new Part(this.formSrc, 'title')),
				content: new Input(new Part(this.formSrc, 'content')),
			}),
		})).value(o);
        return this;
    }
}
