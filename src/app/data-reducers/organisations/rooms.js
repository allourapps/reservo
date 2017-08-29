import { createGetReducer, createGetActionCreator } from 'core/redux';
import { GetRoomsList } from 'api/Rooms';
import { getRoomsList } from 'selectors/index';

const suffix = 'ROOMS';

// -------- actionCreator
export const fetchOrganisationsOfUser = (Guid: string) => createGetActionCreator({
    suffix,
    getStoreItem: getRoomsList,
    apiCall: GetRoomsList,
    apiCallArgs: [ Guid ]
})();

// -------- reducer
export default createGetReducer(suffix);
