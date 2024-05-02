import axios from 'axios';
import { stringify } from 'query-string';
import { DataProvider } from 'react-admin';

import { Donor } from '../../interfaces/Donor';
import { ListParameters } from '../../interfaces/ListParams';

const apiUrl = 'http://localhost:5000/api';

export const customDataProvider: Partial<DataProvider> = {
  getList: async (resource: string, parameters: ListParameters) => {
    const { page, perPage } = parameters.pagination;
    const query = {
      ...parameters.filter,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    try {
      const response = await axios.get(url);
      // TODO: Use zod here
      const totalCount = Number.parseInt(response.headers['x-total-count'], 10);
      const dataWithIds = response.data.map((item: Donor, index: number) => ({
        ...item,
        id: `${index + 1}`,
      }));

      return {
        data: dataWithIds,
        total: totalCount || 1,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data');
    }
  },
};
