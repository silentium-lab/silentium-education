export interface ArticleType extends Record<string, unknown> {
  title: string;
  order: number;
  content: string;
  published: boolean;
}
