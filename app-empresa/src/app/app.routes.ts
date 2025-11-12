import { Routes } from '@angular/router';
import { ListaDepartamento } from './components/lista-departamento/lista-departamento';
import { ListaFuncionario } from './components/lista-funcionario/lista-funcionario';
import { FormDepart } from './components/form-depart/form-depart';
import { FormFunc } from './components/form-func/form-func';

export const routes: Routes = [
  { path: '', redirectTo: '/departamentos', pathMatch: 'full' },
  { path: 'departamentos', component: ListaDepartamento },
  { path: 'departamentos/novo', component: FormDepart },
  { path: 'departamentos/editar/:id', component: FormDepart },
  { path: 'funcionarios', component: ListaFuncionario },
  { path: 'funcionarios/novo', component: FormFunc },
  { path: 'funcionarios/editar/:id', component: FormFunc },
  { path: '**', redirectTo: '/departamentos' }
];