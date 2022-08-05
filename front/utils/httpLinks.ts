import { ROUTES } from './constants';

export const BASIC_URL = 'http://localhost:5000';

//Product
export const GET_PRODUCTS = `${BASIC_URL}${ROUTES.product}`;
export const ADD_PRODUCT_REVIEW = `${BASIC_URL}${ROUTES.product}/add-review`;
export const ADD_PRODUCT_TO_FAVORITE = `${BASIC_URL}${ROUTES.product}/add-to-favorite`;
export const REMOVE_PRODUCT_TO_FAVORITE = `${BASIC_URL}${ROUTES.product}/remove-from-favorite`;
export const ADMIN_PAGE = `${BASIC_URL}${ROUTES.adminPage}`;
export const ADMIN_CHANGE_ORDER_STATUS = `${BASIC_URL}${ROUTES.adminPage}/change-order-status`;
export const ADMIN_ADD_PRODUCT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminAddProduct}`;
export const ADMIN_ADD_PRODUCT_PHOTOS = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminAddProduct}/add-photos`;
export const ADMIN_CHANGE_PRODUCT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminChangeProduct}`;
export const ADMIN_DELETE_PRODUCT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminDeleteProduct}`;
export const ADMIN_USER_MANAGEMENT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminUsersManagement}`;
export const GET_UNCONFIRMED_ORDERS = `${BASIC_URL}/get-unconfirmed-orders`;
export const GET_CONFIRMED_ORDERS = `${BASIC_URL}${ROUTES.adminPage}/get-confirmed-orders`;

//User
export const GET_ORDERS = `${BASIC_URL}/get-orders`;
export const GET_TEAM = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminUsersManagement}/team/get-user-in-team`;
export const USER_ASSIGNMENT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminUsersManagement}/team/user-assignment`;
export const REMOVE_USER_ASSIGNMENT = `${BASIC_URL}${ROUTES.adminPage}${ROUTES.adminUsersManagement}/team/remove-user-assignment`;
export const REFRESH_TOKEN = `${BASIC_URL}/refreshToken`;
export const CHECK_PASSWORD = `${BASIC_URL}/check-password`;
export const SEND_CONFIRM_CODE = `${BASIC_URL}/send-confirm-code`;
export const CREATE_ORDER = `${BASIC_URL}/delivery-details/create-order`;
export const CHANGE_USER_DATA = `${BASIC_URL}/change-user-data`;
export const ADD_USER_PHONE = `${BASIC_URL}/add-user-phone`;
