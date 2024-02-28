import {create} from 'apisauce';

const apiClient = create({
  // baseURL: 'http://192.168.10.66:8080',
  // baseURL: 'https://agora-chat-service-3831b2473141.herokuapp.com/',
  // baseURL: 'http://localhost:9000',
  // baseURL: 'http://ec2-54-67-86-209.us-west-1.compute.amazonaws.com:8000',
  // baseURL: 'https://7afa-154-57-216-255.ngrok-free.app',
  baseURL: 'https://agora.app.staging.pocketmate.ai/',
});

export default apiClient;
