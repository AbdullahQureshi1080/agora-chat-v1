import client from './client';

const createSession = async (channel: any) => {
  try {
    const body = {
      channelName: channel.name,
      userId: channel.userId,
      participants: channel.participants,
      channelAccessId: channel.channelAccessId,
    };
    const request = await client.post(`/access_token`, body);
    return request.data;
  } catch (error) {
    console.log('Service: createSession', error);
  }
};

const createSingleSession = async (channel: any) => {
  try {
    const body = {
      channelName: channel.name,
      userId: channel.userId,
      // participants: channel.participants,
      channelAccessId: channel.channelAccessId,
    };
    const request = await client.post(`/single_access_token`, body);
    return request.data;
  } catch (error) {
    console.log('Service: createSession', error);
  }
};

const createGroupSession = async (channel: any) => {
  try {
    const body = {
      channelName: channel.name,
      userId: channel.userId,
      participants: channel.participants,
      channelAccessId: channel.channelAccessId,
    };
    const request = await client.post(`/group_access_token`, body);
    return request.data;
  } catch (error) {
    console.log('Service: createSession', error);
  }
};

const createRoomSession = async (channel: any) => {
  try {
    const body = {
      channelName: channel.name,
      userId: channel.userId,
      participants: channel.participants,
      channelAccessId: channel.channelAccessId,
    };
    const request = await client.post(`/room_access_token`, body);
    return request.data;
  } catch (error) {
    console.log('Service: createSession', error);
  }
};

export {createSession, createSingleSession, createGroupSession, createRoomSession};
