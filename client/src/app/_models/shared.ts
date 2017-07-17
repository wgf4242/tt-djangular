export class PageObject<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
