import { createGetReducer, createGetActionCreator } from 'core/redux';
import { GetOrganisationsList } from 'api/Organisations';
import { getOrganisationsList } from 'selectors/index';

const suffix = 'ORGANISATIONS';

// -------- actionCreator
export const fetchOrganisationsOfUser = (Guid: string) => createGetActionCreator({
    suffix,
    getStoreItem: getOrganisationsList,
    apiCall: GetOrganisationsList,
    apiCallArgs: [ Guid ]
})();

// -------- reducer
export default createGetReducer(suffix);
