export interface ListParams {
  pagination: {
    page: number;
    perPage: number;
  };
  filter: { [key: string]: any };
}
