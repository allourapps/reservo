// @flow

declare interface ICurrentUser {
    Guid: string,
    OrganisationName: string,
    Name: string,
    Surname: string,
    Address: string,
    Phone: string,
    Email: string,
    Roles: Array<string>,
    UserName: string,
    Password: string,
    Token: string
}
