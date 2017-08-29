import { createGetReducer, createGetActionCreator } from 'core/redux';
import { GetRolesList } from 'api/Roles';
import { getRolesList } from 'selectors/index';

const suffix = 'ROLES';

// -------- actionCreator
export const fetchOrganisationsOfUser = createGetActionCreator({
    suffix,
    getStoreItem: getRolesList,
    apiCall: GetRolesList
});

// -------- reducer
export default createGetReducer(suffix);
