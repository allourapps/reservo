import api from 'packages/api';

export const GetRolesList = (Guid: string, options?: any): Promise<IServiceResult1<IUserData$1>> => {
  const uri = `/api/roles`;
  return api.get(uri, options).then(response => response.json());
};
