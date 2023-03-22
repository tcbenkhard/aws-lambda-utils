import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
interface ApiGatewayHandlerOptions extends Omit<APIGatewayProxyResult, 'body'> {
    logRequest?: boolean;
}
export declare abstract class ApiGatewayHandler<Request, Response> {
    private options;
    constructor(options: ApiGatewayHandlerOptions);
    protected abstract parseEvent(event: APIGatewayProxyEvent, Context: Context): Request;
    protected abstract handleRequest(request: Request): Response;
    handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>;
}
export {};
