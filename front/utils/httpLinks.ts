import { ROUTES } from './constants';

export const BASIC_URL = 'http://localhost:5000';

export const GET_PRODUCTS = `${BASIC_URL}${ROUTES.product}`;
export const ADMIN_PAGE = `${BASIC_URL}${ROUTES.adminPage}`;
export const ADMIN_ADD_PRODUCT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminAddProduct}`;
export const ADMIN_CHANGE_PRODUCT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminChangeProduct}`;
export const ADMIN_DELETE_PRODUCT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminDeleteProduct}`;
export const ADMIN_USER_MANAGEMENT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminUsersManagement}`;
