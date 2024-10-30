// src/environments/environment.development.ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api',
    appName: 'Gestión de Proyectos',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        refresh: '/auth/refresh'
      },
      proyectos: {
        base: '/proyectos',
        activos: '/proyectos/activos',
        coordinador: '/proyectos/coordinador'
      },
      empleados: {
        base: '/empleados',
        disponibles: '/empleados/disponibles'
      },
      tareas: {
        base: '/tareas',
        proyecto: '/tareas/proyecto',
        pendientes: '/tareas/pendientes'
      }
    }
  };