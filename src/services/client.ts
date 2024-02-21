import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://192.168.10.66:8080',
});

export default apiClient;
