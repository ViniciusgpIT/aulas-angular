import { Routes } from '@angular/router';

import { AppVini } from './components/app-vini/app-vini';
import { FormVagas } from './components/form-vagas/form-vagas';

export const routes: Routes = [
    { path: '', component: AppVini },
    { path: 'form-vagas', component: FormVagas }
];