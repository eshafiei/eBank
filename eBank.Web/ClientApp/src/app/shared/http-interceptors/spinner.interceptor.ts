import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    count = 0;
    constructor(private spinner: NgxSpinnerService) {}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show();

        this.count++;

        return next.handle(request)
                   .pipe (finalize(() => {
                        this.count--;
                        if ( this.count === 0 ) {
                            this.spinner.hide();
                        }
                    })
                   );
    }
}
