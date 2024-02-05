import axios from "axios";
import { stringify } from "query-string";
import { ListParams } from "../../interfaces/ListParams";
import { DataProvider } from "react-admin";

const apiUrl = "http://localhost:5000/api";

export const customDataProvider: Partial<DataProvider> = {
  getList: async (resource: string, params: ListParams) => {
    const { page, perPage } = params.pagination;
    const query = {
      ...params.filter,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    try {
      const response = await axios.get(url);
      const totalCount = parseInt(response.headers["x-total-count"], 10);
      console.log(response.data)
      const dataWithIds = response.data.map((item: unknown, index: number) => ({
        ...item,
        id: `${index + 1}`,
      }));

      return {
        data: dataWithIds,
        total: totalCount || 1,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching data");
    }
  },
};
