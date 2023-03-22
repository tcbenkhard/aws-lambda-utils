interface ErrorDetails {
    errorCode: string
}

interface MessageErrorDetails extends ErrorDetails {
    errorMessage: string
}

interface ValidationErrorDetails extends ErrorDetails {
    details: Array<ValidationFieldErrorDetails>
}

interface ValidationFieldErrorDetails {
    field: string,
    errorMessage: string
}

export abstract class ServerError extends Error {
    statusCode: number

    details: ErrorDetails

    constructor(statusCode: number, details: ErrorDetails) {
        super();
        this.statusCode = statusCode
        this.details = details
    }
}

export class ValidationError extends ServerError {
    constructor(fieldErrors: Array<ValidationFieldErrorDetails>) {
        super(400, {
            errorCode: 'VALIDATION_ERROR',
            details: fieldErrors
        } as ValidationErrorDetails);
    }
}

export class ApiError extends ServerError {

    constructor(statusCode: number, errorCode: string, errorMessage: string) {
        super(statusCode, {
            errorCode,
            errorMessage
        } as MessageErrorDetails);
    }
}

export class InternalServerError extends ApiError {
    constructor() {
        super(500, 'UNEXPECTED_ERROR', 'An unexpected error occurred.');
    }
}