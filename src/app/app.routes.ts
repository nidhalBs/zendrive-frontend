import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'booking', loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent) },
  { path: 'fleet', loadComponent: () => import('./features/home/fleet/fleet.component').then(m => m.FleetComponent) },
  { path: 'excursions', loadComponent: () => import('./features/home/excursions/excursions.component').then(m => m.ExcursionsComponent) },
  { path: 'contact', loadComponent: () => import('./features/home/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  {
    path: 'client',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./features/client/dashboard/dashboard.component').then(m => m.ClientDashboardComponent) },
      { path: 'reservations', loadComponent: () => import('./features/client/reservations/reservations.component').then(m => m.ClientReservationsComponent) },
      { path: 'loyalty', loadComponent: () => import('./features/client/loyalty/loyalty.component').then(m => m.ClientLoyaltyComponent) },
      { path: 'profile', loadComponent: () => import('./features/client/profile/profile.component').then(m => m.ClientProfileComponent) },
      { path: 'notifications', loadComponent: () => import('./features/client/notifications/notifications.component').then(m => m.ClientNotificationsComponent) },
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'reservations', loadComponent: () => import('./features/admin/reservations/reservations.component').then(m => m.AdminReservationsComponent) },
      { path: 'vehicles', loadComponent: () => import('./features/admin/vehicles/vehicles.component').then(m => m.AdminVehiclesComponent) },
      { path: 'excursions', loadComponent: () => import('./features/admin/excursions/excursions.component').then(m => m.AdminExcursionsComponent) },
      { path: 'users', loadComponent: () => import('./features/admin/users/users.component').then(m => m.AdminUsersComponent) },
      { path: 'reviews', loadComponent: () => import('./features/admin/reviews/reviews.component').then(m => m.AdminReviewsComponent) },
      { path: 'payments', loadComponent: () => import('./features/admin/payments/payments.component').then(m => m.AdminPaymentsComponent) },
      { path: 'coupons', loadComponent: () => import('./features/admin/coupons/coupons.component').then(m => m.AdminCouponsComponent) },
      { path: 'routes', loadComponent: () => import('./features/admin/routes/routes.component').then(m => m.AdminRoutesComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
