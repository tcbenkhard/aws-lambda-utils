import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {ApiError, InternalServerError} from "../error/api-gateway";

interface ApiGatewayHandlerOptions extends Omit<APIGatewayProxyResult, 'body'>{

}
export abstract class ApiGatewayHandler<Request, Response> {
    private options: ApiGatewayHandlerOptions
    constructor(options: ApiGatewayHandlerOptions) {
        this.options = options
    }

    protected abstract parseEvent(event: APIGatewayProxyEvent, Context: Context): Request;
    protected abstract handleRequest(request: Request): Response

    public async handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
        try {
            const request = await this.parseEvent(event, context)
            const response = await this.handleRequest(request)
            return {
                ...this.options,
                body: JSON.stringify(response)
            }
        } catch (exception) {
            let error = new InternalServerError() // Defaults to internal server error
            if(exception instanceof ApiError) error = exception
            return {
                ...this.options,
                statusCode: error.statusCode,
                body: JSON.stringify(error.details),
            }
        }
    }
}