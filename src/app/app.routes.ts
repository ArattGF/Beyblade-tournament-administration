import { Routes } from '@angular/router';
import { BattleDetailComponent } from './pages/battle-detail/battle-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCompetitionComponent } from './pages/new-competition/new-competition.component';
import { GroupStageComponent } from './pages/group-stage/group-stage.component';
import { FinalResultComponent } from './pages/final-result/final-result.component';
import { PointsTablesComponent } from './pages/points-tables/points-tables.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyCombatComponent } from './pages/verify-combat/verify-combat.component';
import { StartFinalsComponent } from './pages/start-finals/start-finals.component';
import { authGuard } from './utils/guards/auth.guard';


export const routes: Routes = [
    {path: '', redirectTo: '/points-tables', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'new-competition', component: NewCompetitionComponent, canActivate: [authGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [authGuard]}, 
    {path: 'group-stage', component: GroupStageComponent, canActivate: [authGuard]},
    {path: 'battle-detail', component: BattleDetailComponent, canActivate: [authGuard]},
    {path: 'final-result', component: FinalResultComponent, canActivate: [authGuard]},
    {path: 'points-tables', component: PointsTablesComponent},
    {path: 'final', component: FinalResultComponent, canActivate: [authGuard]}, 
    {path: 'verify-combat', component: VerifyCombatComponent, canActivate: [authGuard]},
    {path: 'start-finals', component: StartFinalsComponent, canActivate: [authGuard]}


];
