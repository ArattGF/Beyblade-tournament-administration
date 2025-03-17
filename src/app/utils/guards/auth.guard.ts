import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  try {
    const data = await userService.checkToken();
    
    if (!data.ok) {
      router.navigate(['/login']);
      return false;
    }
    
    return true;
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};