import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SolicitacaoComponent } from './pages/solicitacao/solicitacao.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'solicitacao', component: SolicitacaoComponent }, // Página de cadastro
  { path: 'solicitacao/editar/:id', component: SolicitacaoComponent }
];
