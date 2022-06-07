import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { AtividadeConfiguracaoComponent } from './pages/configuracao/atividade-configuracao/atividade-configuracao.component';
import { ResponsavelConfiguracaoComponent } from './pages/configuracao/responsavel-configuracao/responsavel-configuracao.component';
import { TurnoConfiguracaoComponent } from './pages/configuracao/turno-configuracao/turno-configuracao.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { GerenciarEdicaoComponent } from './pages/configuracao/gerenciar-edicao/gerenciar-edicao.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MeusDadosComponent } from './pages/meusDados/meusDados.component';
import { PalestrasComponent } from './pages/palestras/palestras.component';
import { VisitasTecnicasComponent } from './pages/visitas-tecnicas/visitas-tecnicas.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { AuthGuard } from './_helpers/auth.guard';
import { GerenciarSiteComponent } from './pages/configuracao/gerenciar-site/gerenciar-site.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';
import { MeusCursosComponent } from './pages/meus-cursos/meus-cursos.component';
import { ConfirmarInscricoesComponent } from './pages/configuracao/confirmar-inscricoes/confirmar-inscricoes.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'atividades', component: AtividadesComponent },
  {
    path: 'meus_dados',
    component: MeusDadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gerenciar_edicao',
    component: GerenciarEdicaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracao/atividade',
    component: AtividadeConfiguracaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracao/turno',
    component: TurnoConfiguracaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracao/responsavel',
    component: ResponsavelConfiguracaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracao/site',
    component: GerenciarSiteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'palestras',
    component: PalestrasComponent,
  },
  {
    path: 'workshops',
    component: WorkshopsComponent,
  },
  {
    path: 'visitas-tecnicas',
    component: VisitasTecnicasComponent,
  },
  { path: 'quem-somos', component: QuemSomosComponent },
  {
    path: 'inscricao',
    component: InscricaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meus-cursos',
    component: MeusCursosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracao/confirmar-inscricoes',
    component: ConfirmarInscricoesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
