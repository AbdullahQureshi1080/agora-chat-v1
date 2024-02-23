import {create} from 'apisauce';

const apiClient = create({
  // baseURL: 'http://192.168.10.66:8080',
  baseURL: 'https://agora-chat-service-3831b2473141.herokuapp.com/',
});

export default apiClient;
