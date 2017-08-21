// @flow

declare interface IServiceResult<Result> {
    ErrorCode?: ?string;
    InputError?: ?boolean;
    ResultMessage?: ?string;
    Result?: ?Result;
    Success?: ?boolean;
}
