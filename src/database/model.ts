import {getCurrentTimeUid} from '../utils/helpers';

export const userModel = (data: any) => {
  if (data && typeof data == 'object') {
    const user = {
      userId: data.userId,
      rooms: data.rooms,
      email: data.email,
      channelAccessId: data.uid,
    };
    return user;
  }
  console.error('Model: userModel: invalid data ');
};
