// @flow

type ISize = {
    Width: number,
    Height: number
}

type IPosition = {
    PositionX: number,
    PositionY: number
}

declare interface IRoomInfo {
    Guid: string,
    Size: ISize,
    OrganisationGuid: string
}

declare interface ITableInfo {
    Guid: string,
    Size: ISize,
    Position: IPosition,
    Type: 'Circle' | 'Square',
    RoomGuid: string
}
