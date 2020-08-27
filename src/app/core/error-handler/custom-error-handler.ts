import {ErrorHandler} from '@angular/core';
import {BasicClass} from '../classes/basic-class';
import {HttpErrorResponse} from '@angular/common/http';
import {Alert, MsgType} from '../classes/alert';
import {CustomError} from './custom-error';


export class CustomErrorHandler extends BasicClass implements ErrorHandler {
    constructor() {
        super();
    }

    public async handleError(error: HttpErrorResponse) {
        let message;
        if (error instanceof HttpErrorResponse) {
            // server side errors
            if (!navigator.onLine) {
                // No Internet connection
               await Alert.toast('اشکال در اتصال به اینترنت', MsgType.negative);
                return;
            }

            switch (error.status) {
                case 500:
                    message = 'مشکلی در سرور رخ داده است.';
                    break;
                case 404:
                    message = 'سرویس مورد نظر یافت نشد';
                    break;
                case 403:
                    message = 'خطای دسترسی';
                    break;
                case 422:
                    message = (error.error as  CustomError).customMsg ? error.error.customMsg: 'مشکلی در سرور رخ داده است.';
                    break;

                default:
                    message = 'مشکلی در سرور رخ داده است.';

            }

        } else {
            // front side errors
            message = 'مشکلی رخ داده است.';
            console.log(error);
        }
        if (message) {
            return await Alert.toast(message, MsgType.negative);
        }

    }
}

