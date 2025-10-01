import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Entre } from './pages/entre/entre';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home },
    {path: 'entre', component: Entre },
    {path: 'cadastro', component: Cadastro },
];
