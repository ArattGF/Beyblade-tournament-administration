import { Routes } from '@angular/router';
import { BattleDetailComponent } from './pages/battle-detail/battle-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCompetitionComponent } from './pages/new-competition/new-competition.component';
import { GroupStageComponent } from './pages/group-stage/group-stage.component';
import { FinalResultComponent } from './pages/final-result/final-result.component';
import { PointsTablesComponent } from './pages/points-tables/points-tables.component';

export const routes: Routes = [
    {path: 'battle-detail', component: BattleDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'new-competition', component: NewCompetitionComponent},
    {path: 'group-stage', component: GroupStageComponent},
    {path: 'final-result', component: FinalResultComponent},
    {path: 'points-tables', component: PointsTablesComponent},


];
