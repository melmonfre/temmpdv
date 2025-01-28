import { productApi } from "./products";
import { userApi } from "./users";
import { salesApi } from "./sales";
import { supervisorApi } from "./supervisor";

export const api = {
  // Supervisor API methods
  getPendingAuthorizations: supervisorApi.getPendingAuthorizations,
  getPendingSupervisorOperations: supervisorApi.getPendingSupervisorOperations,
  approveAuthorization: supervisorApi.approveAuthorization,
  rejectAuthorization: supervisorApi.rejectAuthorization,
  checkAuthorizationStatus: supervisorApi.checkAuthorizationStatus,
  requestAuthorization: supervisorApi.requestAuthorization,
  
  // Product API methods
  getProducts: productApi.getProducts,
  getProduct: productApi.getProduct,
  createProduct: productApi.createProduct,
  updateProduct: productApi.updateProduct,
  deleteProduct: productApi.deleteProduct,
  
  // User API methods
  getUsers: userApi.getUsers,
  getUser: userApi.getUser,
  createUser: userApi.createUser,
  updateUser: userApi.updateUser,
  deleteUser: userApi.deleteUser,
  
  // Sales API methods
  getSales: salesApi.getSales,
} as const;

export type Api = typeof api;