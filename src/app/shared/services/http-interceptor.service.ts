import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpLoaderService } from "./http-loader.service"
import { ApplicationSettings } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private httpLoaderService: HttpLoaderService, private router: RouterExtensions) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = ApplicationSettings.getString('token');
        console.log(token);
        
        if(token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            /* req = req.clone({
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token
                })
            }); */
        }
        this.onStart(req.url);
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.onEnd(event.url);
                }
            }/* , (err: any) => {
                this.onEnd(req.url);
                return throwError(err);
            } */),
            catchError((error: HttpErrorResponse) => {
                if(error.error.statusCode == 401) {
                    ApplicationSettings.clear();
                    this.router.navigate(["/auth/login"], { transition: { name: "slideLeft" } });
                }
                alert("error: " + error.error.message);
                this.onEnd(req.url);
                return throwError(error);
            }));
    }

    private onStart(url: string) {
        this.httpLoaderService.onRequestStart();
    }

    private onEnd(url: string): void {
        this.httpLoaderService.onRequestEnd();
    }
}