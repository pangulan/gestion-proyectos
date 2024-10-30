// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Verificar roles si existen en la ruta
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles) {
      const user = authService.getCurrentUser();
      if (!user || !requiredRoles.includes(user.role)) {
        router.navigate(['/unauthorized']);
        return false;
      }
    }
    return true;
  }

  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};