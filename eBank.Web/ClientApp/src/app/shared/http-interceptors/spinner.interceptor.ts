import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    
    count = 0;

    constructor(private spinner: NgxSpinnerService) {}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show();

        this.count++;

        return next.handle(request)
                   .pipe ( tap (
                        //event => console.log(event),
                        //error => console.log(error)
                   ), finalize(() => {
                        this.count--;
                        if ( this.count == 0 ) {
                            this.spinner.hide();
                        }
                    })
                   );
    }
}