export type valueParam = string | number | Array<string | number>;
export interface QueryRow {
  [key: string]: string | number | bigint | null;
}
