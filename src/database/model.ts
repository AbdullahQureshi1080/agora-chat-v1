export const userModel = (data: any) => {
  if (data && typeof data == 'object') {
    const user = {
      userId: data.userId,
      rooms: data.rooms,
    };
    return user;
  }
  console.error('Model: userModel: invalid data ');
};
