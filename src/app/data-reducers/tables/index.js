import { createGetReducer, createGetActionCreator } from 'core/redux';
import { GetTablesList } from 'api/Tables';
import { getTables } from 'selectors/index';

// -------- actionCreator
export const fetchPorts = createGetActionCreator({
    suffix: 'TABLES',
    getStoreItem: getTables,
    apiCall: GetTablesList,
});

// -------- reducer
export default createGetReducer('TABLES');
