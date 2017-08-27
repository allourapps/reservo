import api from 'packages/api';

export const GetRoomsList = (options?: any): Promise<IServiceResult1<IUserData$1>> => {
    const uri = '/api/rooms/:id';
    return api.get(uri, options).then(response => response.json());
};
