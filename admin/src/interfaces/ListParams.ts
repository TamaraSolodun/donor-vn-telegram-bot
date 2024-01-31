export interface ListParams {
  pagination: {
    page: number;
    perPage: number;
  };
  filter?: object;
}
