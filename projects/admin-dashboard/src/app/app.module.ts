import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StyleLibModule} from '../../../style-lib/src/lib/style-lib.module';
import {LoginModule} from './login/login.module';
import {HelpRequestModule} from './help-request/help-request.module';
import {HeaderModule} from './header/header.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RequestInterceptor} from './shared/services/request.interceptor';
import {FooterModule} from './footer/footer.module';
import {HomeModule} from './home/home.module';
import {StorageService} from './shared/services/storage.service';
import {AuthenticationGuardService} from './shared/services/authentication-guard.service';
import {Router} from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function requestInterceptorFactory(storageService: StorageService,
                                          authenticationGuardService: AuthenticationGuardService,
                                          router: Router) {
  return new RequestInterceptor(storageService, authenticationGuardService, router);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HelpRequestModule,
    StyleLibModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
      useFactory: requestInterceptorFactory,
      deps: [StorageService, AuthenticationGuardService, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
