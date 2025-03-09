import { Routes } from '@angular/router';
import { BattleDetailComponent } from './pages/battle-detail/battle-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCompetitionComponent } from './pages/new-competition/new-competition.component';
import { GroupStageComponent } from './pages/group-stage/group-stage.component';
import { FinalResultComponent } from './pages/final-result/final-result.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyCombatComponent } from './pages/verify-combat/verify-combat.component';
import { StartFinalsComponent } from './pages/start-finals/start-finals.component';


export const routes: Routes = [
    {path: 'battle-detail', component: BattleDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'new-competition', component: NewCompetitionComponent},
    {path: 'group-stage', component: GroupStageComponent},
    {path: 'final', component: FinalResultComponent}, 
    {path: 'register', component: RegisterComponent}, 
    {path: 'verify-combat', component: VerifyCombatComponent},
    {path: 'start-finals', component: StartFinalsComponent}


];
