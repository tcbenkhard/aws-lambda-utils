"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayHandler = void 0;
const api_gateway_1 = require("../error/api-gateway");
class ApiGatewayHandler {
    constructor(options) {
        this.options = options;
    }
    handler(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield this.parseEvent(event, context);
                if (this.options.logRequest)
                    console.log('Parsed event as', request);
                const response = yield this.handleRequest(request);
                console.log('Handled request with result', response);
                return Object.assign(Object.assign({}, this.options), { body: JSON.stringify(response) });
            }
            catch (exception) {
                console.error(exception);
                let error = new api_gateway_1.InternalServerError(); // Defaults to internal server error
                if (exception instanceof api_gateway_1.ApiError) {
                    error = exception;
                }
                return Object.assign(Object.assign({}, this.options), { statusCode: error.statusCode, body: JSON.stringify(error.details) });
            }
        });
    }
}
exports.ApiGatewayHandler = ApiGatewayHandler;
