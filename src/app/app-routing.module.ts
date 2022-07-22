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
import { PresencaComponent } from './pages/configuracao/presenca/presenca.component';
import { MeusCertificadosModule } from './pages/meus-certificados/meus-certificados.module';
import { MeusCertificadosComponent } from './pages/meus-certificados/meus-certificados.component';
import { GerarCertificadoComponent } from './pages/configuracao/gerar-certificado/gerar-certificado.component';
import { GerenciarEdicaoAtivaComponent } from './pages/configuracao/gerenciar-edicao-ativa/gerenciar-edicao-ativa.component';
import { EmConstrucaoGuard } from './_helpers/emConstrucao.guard';
import { ComissaoComponent } from './pages/configuracao/comissao/comissao.component';
import { CadastroIncompletoGuard } from './_helpers/cadastro_incompleto.guard';
import { ComoChegarComponent } from './pages/como-chegar/como-chegar.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { UsuariosComponent } from './pages/configuracao/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  {
    path: 'atividades',
    component: AtividadesComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'meus_dados',
    component: MeusDadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gerenciar_edicao',
    component: GerenciarEdicaoComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/atividade',
    component: AtividadeConfiguracaoComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/turno',
    component: TurnoConfiguracaoComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/responsavel',
    component: ResponsavelConfiguracaoComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/comissao',
    component: ComissaoComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'cursos',
    component: CursosComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'palestras',
    component: PalestrasComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'workshops',
    component: WorkshopsComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'visitas-tecnicas',
    component: VisitasTecnicasComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'quem-somos',
    component: QuemSomosComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'como-chegar',
    component: ComoChegarComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'fale-conosco',
    component: FaleConoscoComponent,
    canActivate: [EmConstrucaoGuard],
  },
  {
    path: 'inscricao',
    component: InscricaoComponent,
    canActivate: [AuthGuard, EmConstrucaoGuard, CadastroIncompletoGuard],
  },
  {
    path: 'meus-cursos',
    component: MeusCursosComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
  },
  {
    path: 'meus-certificados',
    component: MeusCertificadosComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
  },
  {
    path: 'configuracao/confirmar-inscricoes',
    component: ConfirmarInscricoesComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/presenca',
    component: PresencaComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/gerar-certificado',
    component: GerarCertificadoComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/gerenciar-edicao-ativa',
    component: GerenciarEdicaoAtivaComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
  {
    path: 'configuracao/usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard, CadastroIncompletoGuard],
    data: {
      role: 'adm',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
