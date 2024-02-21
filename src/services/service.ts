import client from './client';

const createSession = async (channel: any) => {
  try {
    const body = {
      channelName: channel.name,
      userId: channel.userId,
      participants: channel.participants,
    };
    const request = await client.post(`/access_token`, body);
    return request.data;
  } catch (error) {
    console.log('Service: createSession', error);
  }
};

export {createSession};
