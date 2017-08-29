import { createGetReducer, createGetActionCreator } from 'core/redux';
import { GetTablesList } from 'api/Tables';
import { getTablesList } from 'selectors/index';

const suffix = 'TABLES';

// -------- actionCreator
export const fetchOrganisationsOfUser = (Guid: string) => createGetActionCreator({
    suffix,
    getStoreItem: getTablesList,
    apiCall: GetTablesList,
    apiCallArgs: [ Guid ]
})();

// -------- reducer
export default createGetReducer(suffix);
