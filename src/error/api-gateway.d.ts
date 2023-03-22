interface ErrorDetails {
    errorCode: string;
}
interface ValidationFieldErrorDetails {
    field: string;
    errorMessage: string;
}
export declare abstract class ServerError extends Error {
    statusCode: number;
    details: ErrorDetails;
    constructor(statusCode: number, details: ErrorDetails);
}
export declare class ValidationError extends ServerError {
    constructor(fieldErrors: Array<ValidationFieldErrorDetails>);
}
export declare class ApiError extends ServerError {
    constructor(statusCode: number, errorCode: string, errorMessage: string);
}
export declare class InternalServerError extends ApiError {
    constructor();
}
export {};
