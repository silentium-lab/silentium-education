export interface ArticleType extends Record<string, unknown> {
  title: string;
  content: string;
  published: boolean;
}
