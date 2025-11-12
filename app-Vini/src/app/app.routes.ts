import { Routes } from '@angular/router';

import { AppVini } from './components/app-vini/app-vini';
import { FormVagas } from './components/form-vagas/form-vagas';
import { ListaGestores } from './components/lista-gestores/lista-gestores';
import { ListaDepartamentos } from './components/lista-departamentos/lista-departamentos';

export const routes: Routes = [
    { path: '', component: AppVini },
    { path: 'lista-gestores', component: ListaGestores },
    { path: 'form-vagas', component: FormVagas },
    { path: 'lista-departamentos', component: ListaDepartamentos }
];