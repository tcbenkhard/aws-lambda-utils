import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {ApiError, InternalServerError} from "../error/api-gateway";

interface ApiGatewayHandlerOptions extends Omit<APIGatewayProxyResult, 'body'>{
    logRequest?: boolean
}
export abstract class ApiGatewayHandler<Request, Response> {
    private options: ApiGatewayHandlerOptions
    constructor(options: ApiGatewayHandlerOptions) {
        this.options = options
    }

    protected abstract parseEvent(event: APIGatewayProxyEvent, Context: Context): Promise<Request>;
    protected abstract handleRequest(request: Request): Promise<Response>

    public async handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
        try {
            const request = await this.parseEvent(event, context)
            if(this.options.logRequest == true) console.log('Parsed event as', request);
            const response = await this.handleRequest(request)
            console.log('Handled request with result', response)
            return {
                ...this.options,
                body: JSON.stringify(response)
            }
        } catch (exception) {
            console.error(exception)
            let error = new InternalServerError() // Defaults to internal server error
            if(exception instanceof ApiError) {
                error = exception
            }
            return {
                ...this.options,
                statusCode: error.statusCode,
                body: JSON.stringify(error.details),
            }
        }
    }
}