export const getApp = (state) => state.app;

export const getAppData = (state) => getApp(state).data;
export const getAppAuth = (state) => getApp(state).auth;

export const getTables = (state) => getAppData(state).tables;

export const getLogin = (state) => getAppAuth(state).login;
