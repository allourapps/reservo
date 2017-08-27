import api from 'packages/api';

export const GetTablesList = (Guid: string, options?: any): Promise<IServiceResult1<IUserData$1>> => {
  const uri = `/api/tables/${Guid}`;
  return api.get(uri, options).then(response => response.json());
};
