export interface ListParameters {
  pagination: {
    page: number;
    perPage: number;
  };
  filter: { [key: string]: any };
}
