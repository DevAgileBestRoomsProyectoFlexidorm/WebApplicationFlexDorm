export interface ApiResponse<T> {
    message: String;
    status: ApiResponseStatus;
    data: T;
}

export enum ApiResponseStatus {
    Success = 'SUCCESS',
    Error = 'ERROR'
}