import api from 'packages/api';

export const GetOrganisationsList = (Guid: string, options?: any): Promise<IServiceResult1<IUserData$1>> => {
    const uri = `/api/organisations/${Guid}`;
    return api.get(uri, options).then(response => response.json());
};
