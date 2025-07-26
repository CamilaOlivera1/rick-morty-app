import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CharacterListComponent } from './components/character-list/character-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirige '' a /home
  { path: 'home', component: CharacterListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
