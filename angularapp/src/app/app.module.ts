import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication
    (
      {
        auth:
        {
          clientId: '0d384eaf-57b8-4470-b6c7-567f3f7ac18e',
          redirectUri: 'http://localhost:4200',
          authority:'https://login.microsoftonline.com/1067bf22-a04c-4fa6-bcb3-e9231d15aa51'
        },
        cache:
        {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie:false
        }
      }
    ),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes:['User.Read']
        }
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([['https://graph.microsoft.com/v1.0/me',['User.Read']]]
        )
      }
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }, MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
