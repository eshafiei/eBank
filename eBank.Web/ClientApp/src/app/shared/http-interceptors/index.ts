import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SpinnerInterceptor } from './spinner.interceptor';
import { EnsureHttpsInterceptor } from './ensure-https.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true}
];