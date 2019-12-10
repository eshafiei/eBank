import { HttpStatus } from '../enums/http-status.enum';

export interface IHttpResponse {
    status: HttpStatus;
    result: string;
}
