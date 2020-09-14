
type HttpCode =  200 | 403 | 500 | 201;

export class BaseResponse {
  httpCode: HttpCode = 200;
  message = 'OK';
  errors: string[];
}
