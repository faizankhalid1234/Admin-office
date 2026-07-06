export type Locale = "en" | "es";

export const LOCALES: Locale[] = ["en", "es"];

export const LANGUAGE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const en = {
  "app.adminSite": "Admin Site",
  "app.controlCenter": "Admin Control Center",
  "app.adminPanel": "Admin Panel",

  "nav.dashboard": "Dashboard",
  "nav.users": "Users",
  "nav.budget": "Budget",
  "nav.expenses": "Expense History",
  "nav.employeeWebsite": "Employee Website",
  "nav.signOut": "Sign out",

  "login.securePortal": "Secure Portal",
  "login.title": "Admin Control Center",
  "login.subtitle":
    "Separate admin site for {company}. Manage users, roles, and passwords — not the employee expense website.",
  "login.feature1": "Create & edit user accounts",
  "login.feature2": "Reset passwords & assign roles",
  "login.feature3": "Admin-only dashboard & stats",
  "login.copyright": "© 2026 {company}. Admin access only.",
  "login.adminOnly": "Admin only",
  "login.controlCenter": "Control Center",
  "login.signIn": "Admin sign in",
  "login.enterCredentials": "Enter admin credentials",
  "login.notEmployeeLogin": "This is not the employee website login",
  "login.adminEmail": "Admin email",
  "login.password": "Password",
  "login.verifying": "Verifying...",
  "login.accessPanel": "Access Admin Panel",
  "login.authorizedOnly": "Authorized administrators only",
  "login.welcome": "Welcome to Admin Control Center",
  "login.invalidCredentials": "Invalid email or password",
  "login.signInFailed": "Sign in failed. Please try again.",
  "login.loginFailed": "Login failed. Please try again.",

  "dashboard.badge": "Admin Control Center",
  "dashboard.welcome": "Welcome, {name}",
  "dashboard.subtitle": "Separate admin backend — manage users & system data",
  "dashboard.totalUsers": "Total Users",
  "dashboard.admins": "Admins",
  "dashboard.employees": "Employees",
  "dashboard.totalExpenses": "Total Expenses",
  "dashboard.quickActions": "Quick actions",
  "dashboard.quickActionsDesc": "Manage your team from this admin portal",
  "dashboard.manageUsers": "Manage Users",
  "dashboard.viewExpenses": "View All Expenses",
  "dashboard.openWebsite": "Open Employee Website",

  "users.badge": "Admin Site",
  "users.title": "User Management",
  "users.desc":
    "View all users, add accounts, change roles, resign (deactivate), or delete",

  "budget.badge": "Admin Site",
  "budget.title": "Company Budget",
  "budget.desc":
    "Set the monthly company budget here. The employee website updates automatically.",

  "expenses.badge": "Admin Site",
  "expenses.title": "All Employee Expenses",
  "expenses.desc":
    "View every expense added by employees. Only administrators can see this history — employees only see their own expenses on the website.",
  "expenses.search": "Search title, employee, email...",
  "expenses.allUsers": "All employees",
  "expenses.allCategories": "All categories",
  "expenses.employee": "Employee",
  "expenses.date": "Date",
  "expenses.titleCol": "Title",
  "expenses.category": "Category",
  "expenses.amount": "Amount",
  "expenses.payment": "Payment",
  "expenses.details": "Notes",
  "expenses.receipt": "Receipt",
  "expenses.view": "View",
  "expenses.notFound": "No expenses found",
  "expenses.totalRecords": "Records shown",
  "expenses.filteredNote": "Filter by employee, category, or search",
  "expenses.adminOnlyNote": "Admin-only view — employees cannot access this page",
  "expenses.showing": "Showing {count} expense(s)",

  "settings.language": "Language",
  "settings.appearance": "Appearance",
  "settings.light": "Light",
  "settings.dark": "Dark",
  "settings.system": "System",
  "settings.toggleTheme": "Toggle theme",

  "error.somethingWrong": "Something went wrong",
  "error.tryAgain": "Try again",
} as const;

const es = {
  "app.adminSite": "Sitio de administración",
  "app.controlCenter": "Centro de control de administración",
  "app.adminPanel": "Panel de administración",

  "nav.dashboard": "Panel",
  "nav.users": "Usuarios",
  "nav.budget": "Presupuesto",
  "nav.expenses": "Historial de gastos",
  "nav.employeeWebsite": "Sitio web de empleados",
  "nav.signOut": "Cerrar sesión",

  "login.securePortal": "Portal seguro",
  "login.title": "Centro de control de administración",
  "login.subtitle":
    "Sitio de administración separado para {company}. Gestione usuarios, roles y contraseñas — no el sitio web de gastos de empleados.",
  "login.feature1": "Crear y editar cuentas de usuario",
  "login.feature2": "Restablecer contraseñas y asignar roles",
  "login.feature3": "Panel y estadísticas solo para administradores",
  "login.copyright": "© 2026 {company}. Solo acceso de administradores.",
  "login.adminOnly": "Solo administradores",
  "login.controlCenter": "Centro de control",
  "login.signIn": "Inicio de sesión de administrador",
  "login.enterCredentials": "Ingrese credenciales de administrador",
  "login.notEmployeeLogin": "Este no es el inicio de sesión del sitio web de empleados",
  "login.adminEmail": "Correo de administrador",
  "login.password": "Contraseña",
  "login.verifying": "Verificando...",
  "login.accessPanel": "Acceder al panel de administración",
  "login.authorizedOnly": "Solo administradores autorizados",
  "login.welcome": "Bienvenido al centro de control de administración",
  "login.invalidCredentials": "Correo o contraseña inválidos",
  "login.signInFailed": "Error al iniciar sesión. Inténtelo de nuevo.",
  "login.loginFailed": "Error de inicio de sesión. Inténtelo de nuevo.",

  "dashboard.badge": "Centro de control de administración",
  "dashboard.welcome": "Bienvenido, {name}",
  "dashboard.subtitle":
    "Backend de administración separado — gestione usuarios y datos del sistema",
  "dashboard.totalUsers": "Usuarios totales",
  "dashboard.admins": "Administradores",
  "dashboard.employees": "Empleados",
  "dashboard.totalExpenses": "Gastos totales",
  "dashboard.quickActions": "Acciones rápidas",
  "dashboard.quickActionsDesc": "Gestione su equipo desde este portal de administración",
  "dashboard.manageUsers": "Gestionar usuarios",
  "dashboard.viewExpenses": "Ver todos los gastos",
  "dashboard.openWebsite": "Abrir sitio web de empleados",

  "users.badge": "Sitio de administración",
  "users.title": "Gestión de usuarios",
  "users.desc":
    "Ver todos los usuarios, agregar cuentas, cambiar roles, dar de baja (desactivar) o eliminar",

  "budget.badge": "Sitio de administración",
  "budget.title": "Presupuesto de la empresa",
  "budget.desc":
    "Establezca el presupuesto mensual de la empresa aquí. El sitio web de empleados se actualiza automáticamente.",

  "expenses.badge": "Sitio de administración",
  "expenses.title": "Todos los gastos de empleados",
  "expenses.desc":
    "Vea cada gasto agregado por los empleados. Solo los administradores pueden ver este historial — los empleados solo ven sus propios gastos en el sitio web.",
  "expenses.search": "Buscar título, empleado, correo...",
  "expenses.allUsers": "Todos los empleados",
  "expenses.allCategories": "Todas las categorías",
  "expenses.employee": "Empleado",
  "expenses.date": "Fecha",
  "expenses.titleCol": "Título",
  "expenses.category": "Categoría",
  "expenses.amount": "Monto",
  "expenses.payment": "Pago",
  "expenses.details": "Notas",
  "expenses.receipt": "Recibo",
  "expenses.view": "Ver",
  "expenses.notFound": "No se encontraron gastos",
  "expenses.totalRecords": "Registros mostrados",
  "expenses.filteredNote": "Filtrar por empleado, categoría o búsqueda",
  "expenses.adminOnlyNote": "Vista solo para administradores — los empleados no pueden acceder",
  "expenses.showing": "Mostrando {count} gasto(s)",

  "settings.language": "Idioma",
  "settings.appearance": "Apariencia",
  "settings.light": "Claro",
  "settings.dark": "Oscuro",
  "settings.system": "Sistema",
  "settings.toggleTheme": "Cambiar tema",

  "error.somethingWrong": "Algo salió mal",
  "error.tryAgain": "Intentar de nuevo",
} as const;

export type TranslationKey = keyof typeof en;

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  es,
};
