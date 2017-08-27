import api from 'packages/api';

export const GetRoomsList = (Guid: string, options?: any): Promise<IServiceResult1<IUserData$1>> => {
    const uri = `/api/rooms/${Guid}`;
    return api.get(uri, options).then(response => response.json());
};
