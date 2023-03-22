"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ApiError = exports.ValidationError = exports.ServerError = void 0;
class ServerError extends Error {
    constructor(statusCode, details) {
        super();
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.ServerError = ServerError;
class ValidationError extends ServerError {
    constructor(fieldErrors) {
        super(400, {
            errorCode: 'VALIDATION_ERROR',
            details: fieldErrors
        });
    }
}
exports.ValidationError = ValidationError;
class ApiError extends ServerError {
    constructor(statusCode, errorCode, errorMessage) {
        super(statusCode, {
            errorCode,
            errorMessage
        });
    }
}
exports.ApiError = ApiError;
class InternalServerError extends ApiError {
    constructor() {
        super(500, 'UNEXPECTED_ERROR', 'An unexpected error occurred.');
    }
}
exports.InternalServerError = InternalServerError;
