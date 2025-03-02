import { Routes } from '@angular/router';
import { BattleDetailComponent } from './pages/battle-detail/battle-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCompetitionComponent } from './pages/new-competition/new-competition.component';
import { GroupStageComponent } from './pages/group-stage/group-stage.component';

export const routes: Routes = [
    {path: 'battle-detail', component: BattleDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'new-competition', component: NewCompetitionComponent},
    {path: 'group-stage', component: GroupStageComponent},


];
