import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioModule } from './pages/inicio/inicio.module';
import { LoginModule } from './shared/components/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MeusDadosModule } from './pages/meusDados/meusDados.module';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { GerenciarEdicaoModule } from './pages/configuracao/gerenciar-edicao/gerenciar-edicao.module';
import { AtividadesModule } from './pages/atividades/atividades.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AtividadeConfiguracaoModule } from './pages/configuracao/atividade-configuracao/atividade-configuracao.module';
import { AdicionarEditarAtividadeModule } from './pages/adicionar-editar-atividade/adicionar-editar-atividade.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { PalestrasModule } from './pages/palestras/palestras.module';
import { WorkshopsModule } from './pages/workshops/workshops.module';
import { VisitasTecnicasModule } from './pages/visitas-tecnicas/visitas-tecnicas.module';
import { TurnoConfiguracaoModule } from './pages/configuracao/turno-configuracao/turno-configuracao.module';
import { AdicionarEditarTurnoModule } from './pages/adicionar-editar-turno/adicionar-editar-turno.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { ResponsavelConfiguracaoModule } from './pages/configuracao/responsavel-configuracao/responsavel-configuracao.module';
import { GerenciarSiteModule } from './pages/configuracao/gerenciar-site/gerenciar-site.module';
import { QuemSomosModule } from './pages/quem-somos/quem-somos.module';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HttpCacheIntercept } from './_helpers/httpCache.intercept';
import {
  GoogleLoginProvider,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InscricaoModule } from './pages/inscricao/inscricao.module';
import { MeusCursosModule } from './pages/meus-cursos/meus-cursos.module';
import { ConfirmarInscricoesModule } from './pages/configuracao/confirmar-inscricoes/confirmar-inscricoes.module';
import { MatBadgeModule } from '@angular/material/badge';
import { PresencaModule } from './pages/configuracao/presenca/presenca.module';
import { MeusCertificadosModule } from './pages/meus-certificados/meus-certificados.module';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NgbModule,
    InicioModule,
    SocialLoginModule,
    LoginModule,
    HttpClientModule,
    MeusDadosModule,
    GerenciarEdicaoModule,
    AtividadesModule,
    ToastrModule.forRoot(),
    NgbModule,
    ImageCropperModule,
    AtividadeConfiguracaoModule,
    AdicionarEditarAtividadeModule,
    CursosModule,
    PalestrasModule,
    WorkshopsModule,
    VisitasTecnicasModule,
    TurnoConfiguracaoModule,
    AdicionarEditarTurnoModule,
    ResponsavelConfiguracaoModule,
    GerenciarSiteModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    QuemSomosModule,
    InscricaoModule,
    MeusCursosModule,
    ConfirmarInscricoesModule,
    MatBadgeModule,
    PresencaModule,
    MeusCertificadosModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '66537848784-0b8g1ra6u7o1otbua56ujei1ri8a797q.apps.googleusercontent.com'
            ),
          },
        ],
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheIntercept,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
