import axios from 'axios';
import { stringify } from 'query-string';


const apiUrl = 'http://localhost:5000/api'; 

export const customDataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const query = {
          ...params.filter,
          _start: (page - 1) * perPage,
          _end: page * perPage,
        };
    
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
    
        try {
          const response = await axios.get(url);
          const totalCount = parseInt(response.headers['x-total-count'], 10);
    
          const dataWithIds = response.data.map((item, index) => ({
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