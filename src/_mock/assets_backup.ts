import { faker } from "@faker-js/faker";
import type { Menu, Permission, Role, User } from "#/entity";
import { PermissionType } from "#/enum";

// Dashboard menu for roles
export const DB_MENU: Menu[] = [
  // Dashboard group
  {
    id: "group_dashboard",
    name: "Dashboard",
    code: "dashboard",
    parentId: "",
    type: PermissionType.GROUP,
  },
  // Workbench - barcha rollar uchun umumiy
  {
    id: "admin-dashboard",
    parentId: "group_dashboard",
    name: "Admin_panel",
    code: "Admin_panel",
    type: PermissionType.MENU,
    path: "/admin-dashboard",
    component: "/dashboard/admin",
  },
  // Analysis - faqat ADMIN va SUPER-ADMIN uchun
  {
    id: "super_admin",
    parentId: "group_super_admin",
    name: "Super_admin",
    code: "super_admin",
    type: PermissionType.MENU,
    path: "/super_admin",
    component: "/dashboard/super_admin",
    roles: ["ADMIN", "SUPER-ADMIN"],
  },
  // Teacher Dashboard
  {
    id: "teacher_dashboard",
    parentId: "group_dashboard",
    name: "Teacher Dashboard",
    code: "teacher_dashboard",
    type: PermissionType.MENU,
    path: "/teacher/dashboard",
    component: "/dashboard/teacher",
    roles: ["TEACHER"],
  },
  // Parent Dashboard
  {
    id: "parent_dashboard",
    parentId: "group_dashboard",
    name: "Parent Dashboard",
    code: "parent_dashboard",
    type: PermissionType.MENU,
    path: "/parent/dashboard",
    component: "/dashboard/parent",
    roles: ["PARENT"],
  },
  // User Dashboard
  {
    id: "user_dashboard",
    parentId: "group_dashboard",
    name: "User Dashboard",
    code: "user_dashboard",
    type: PermissionType.MENU,
    path: "/user/dashboard",
    component: "/dashboard/student",
    roles: ["USER"],
  },
];

export const jwt =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzODkyMjExMDAwNzAiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTc2NjIzNjM3MSwiZXhwIjoxNzY4ODI4MzcxfQ.p7utD95657tgHLbyGd81rW01wT1aDCsyrKPpsbGsVAo";
// Users
export const DB_USER: User[] = [
  {
    id: "user_admin_id",
    username: "admin",
    password: "1234",
    role: "ADMIN",
    phone: "+998900000000",
  },
  {
    id: "user_super_id",
    username: "super_admin",
    password: "1111",
    role: "SUPER_ADMIN",
    phone: "+998910000000",
  },
  {
    id: "user_teacher_id",
    username: "teacher",
    password: "2222",
    role: "TEACHER",
    phone: "+998920000000",
  },
  {
    id: "user_parent_id",
    username: "parent",
    password: "3333",
    role: "PARENT",
    phone: "+998930000000",
  },
  {
    id: "user_user_id",
    username: "user",
    password: "4444",
    role: "USER",
    phone: "+998940000000",
  },
];

// Roles
export const DB_ROLE: Role[] = [
  { id: "role_admin_id", name: "admin", code: "SUPER_ADMIN" },
  { id: "role_test_id", name: "test", code: "TEST" },
];

// Permissions
export const DB_PERMISSION: Permission[] = [
  {
    id: "permission_create",
    name: "permission-create",
    code: "permission:create",
  },
  { id: "permission_read", name: "permission-read", code: "permission:read" },
  {
    id: "permission_update",
    name: "permission-update",
    code: "permission:update",
  },
  {
    id: "permission_delete",
    name: "permission-delete",
    code: "permission:delete",
  },
];

// User-Role mapping
export const DB_USER_ROLE = [
  {
    id: "user_admin_role_admin",
    userId: "user_admin_id",
    roleId: "role_admin_id",
  },
  { id: "user_test_role_test", userId: "user_test_id", roleId: "role_test_id" },
];

// Role-Permission mapping
export const DB_ROLE_PERMISSION = [
  {
    id: faker.string.uuid(),
    roleId: "role_admin_id",
    permissionId: "permission_create",
  },
  {
    id: faker.string.uuid(),
    roleId: "role_admin_id",
    permissionId: "permission_read",
  },
  {
    id: faker.string.uuid(),
    roleId: "role_admin_id",
    permissionId: "permission_update",
  },
  {
    id: faker.string.uuid(),
    roleId: "role_admin_id",
    permissionId: "permission_delete",
  },

  {
    id: faker.string.uuid(),
    roleId: "role_test_id",
    permissionId: "permission_read",
  },
  {
    id: faker.string.uuid(),
    roleId: "role_test_id",
    permissionId: "permission_update",
  },
];
