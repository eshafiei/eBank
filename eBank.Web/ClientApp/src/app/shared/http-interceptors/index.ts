import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SpinnerInterceptor } from './spinner.interceptor';
import { EnsureHttpsInterceptor } from './ensure-https.interceptor';
import { TokenInterceptor } from 'src/app/shared/http-interceptors/token.interceptor';
import { UnAuthorizedInterceptor } from './un-authorized.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true }
];
